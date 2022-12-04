import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpCode,
  ParseArrayPipe,
  HttpStatus,
  HttpException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller({
  version: '1',
  path: 'chats',
})
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getConverstions(@Request() req) {
    const userId = req.user.id;
    return this.chatService.getConversations(userId);
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getMessages(@Param('id') id: string) {
    return this.chatService.findMessages(id);
  }

  @Post(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  createMessage(
    @Param('id') id: string,
    @Request() req,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    const userId = req.user.id;
    return this.chatService.createMessage(id, userId, createMessageDto);
  }
}
