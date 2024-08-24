import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true, namespace: 'chat' })
export class ChatGateway
  implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ChatGateWay');

  constructor(private readonly chatService: ChatService) {}
  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: any) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  afterInit() {
    this.logger.log(`Chat app initialized`);
  }

  @SubscribeMessage('send_message')
  async handleMessage(client: Socket, text: string): Promise<void> {
    this.server.emit('receive_message', text);
  }

  @SubscribeMessage('join_conversation')
  async joinRoom() {
    console.log('joined room');
  }

  @SubscribeMessage('typing')
  async typing() {
    console.log('typing');
  }
}
