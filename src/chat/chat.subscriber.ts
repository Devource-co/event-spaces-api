import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/messages.entity';

@EventSubscriber()
export class ChatSubscriber implements EntitySubscriberInterface<Message> {
  listenTo(): string | any {
    return Message;
  }

  async afterInsert(event: InsertEvent<Message>): Promise<any | void> {
    await event.manager.update(Conversation, event.entity.conversation_id, {
      last_message_id: event.entity.id,
    });
  }
}
