import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Conversation } from './conversation.entity';

@Entity()
@Index(['conversation_id', 'user_id'])
export class Participant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  conversation_id: string;

  @ManyToMany(() => Conversation, { cascade: true })
  @JoinColumn({ name: 'conversation_id', referencedColumnName: 'id' })
  conversations: Conversation;

  @Column('uuid')
  user_id: string;

  @ManyToMany(() => User, { cascade: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
