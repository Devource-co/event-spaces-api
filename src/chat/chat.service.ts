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
    return this.messageRepository.find({
      where : { conversation: { id } },
      order: {createdAt:'DESC'}
    })
  }

  async getConversations(userId: string) {
    return this.conversationRepository.find({
      relations: { users: true, last_message: true },
      where: {
        users: {
          id: userId,
        }
      },
    })
  }

  async createMessage(id: string, userId: string, createMessageDto: CreateMessageDto) {
    const message = this.messageRepository.create({
     conversation_id: id,
      user_id: userId,
      ...createMessageDto,
    });
    await message.save();
    return message;
  }
}
