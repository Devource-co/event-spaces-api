import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Message } from './messages.entity';

@Entity()
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToMany(() => User, (user) => user.conversations)
  users: Relation<User>[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Relation<Message>[];

  @Column({ type: 'uuid', nullable: true })
  last_message_id: string;

  @OneToOne(() => Message, (message) => message.last_conversation)
  @JoinColumn({ name: 'last_message_id', referencedColumnName: 'id' })
  last_message: Relation<Message>;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
