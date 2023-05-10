import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import { Conversation } from './entities/conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/messages.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { paginateRaw } from 'nestjs-typeorm-paginate';

@Injectable()
export class ChatService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async getUserFromSocket(socket: Socket) {
    const cookie = socket.handshake.headers.cookie;
    const { Authentication: authenticationToken } = parse(cookie);
    const user = await this.authService.getUserFromAuthenticationToken(
      authenticationToken,
    );
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }

  async findMessages(id: string) {
    const qb = this.messageRepository
      .createQueryBuilder('message')
      .select([
        "TO_CHAR(DATE(message.createdAt), 'yyyy-mm-dd') AS date",
        'message.id as id',
        'message.message as message',
        'message.conversation_id as conversation_id',
        'message.user_id as user_id',
        'message.createdAt as "createdAt"',
      ])
      .where('conversation_id = :id', { id })
      .orderBy('DATE(message.createdAt)', 'ASC');
    const paginatedMessages = await paginateRaw<Message>(qb, {
      limit: 90,
      page: 1,
    });
    const groups = {};
    paginatedMessages?.items.forEach(function (item) {
      const date = item.date;
      if (date in groups) {
        groups[date].push(item);
      } else {
        groups[date] = new Array(item);
      }
    });

    return {
      ...paginatedMessages,
      items: groups,
    };
  }

  async getConversations(userId: string) {
    return this.conversationRepository.find({
      relations: { users: true, last_message: true },
      where: {
        users: {
          id: userId,
        },
      },
    });
  }

  async createMessage(
    id: string,
    userId: string,
    createMessageDto: CreateMessageDto,
  ) {
    const message = this.messageRepository.create({
      conversation_id: id,
      user_id: userId,
      ...createMessageDto,
    });
    await message.save();
    return message;
  }
}
