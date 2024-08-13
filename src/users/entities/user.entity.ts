import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Industry } from './industry.entity';
import { Role } from '../../auth/role.enum';
import { Space } from '../../space/entities/space.entity';
import { Message } from '../../chat/entities/messages.entity';
import { Conversation } from '../../chat/entities/conversation.entity';
import { Exclude } from 'class-transformer';
import { PaymentMethod } from '../../payment-methods/entities/payment-method.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity()
@Index(['id', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  firstname?: string;

  @Column({ nullable: true })
  lastname?: string;

  @Column({ nullable: true, unique: true })
  phone?: string;

  @Column({ default: false })
  email_verified?: boolean;

  @Column({ default: false })
  phone_verified?: boolean;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  profile_pic?: string;

  @Column({ nullable: true })
  jobTitle?: string;

  @Column({ nullable: true })
  organization?: string;

  @Column({ default: false })
  connectedToGoogle?: boolean;

  @Column({ default: false })
  connectedToFacebook?: boolean;

  @Column({ default: false })
  hasPassword?: boolean;

  @Column({ nullable: true, type: 'uuid' })
  industry_id?: string;

  @Index('industry_userId_index')
  @ManyToOne(() => Industry, { cascade: true })
  @JoinColumn({ name: 'industry_id', referencedColumnName: 'id' })
  industry?: Industry;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ default: false })
  allowNotifications?: boolean;

  @OneToMany(() => Space, (space) => space.owner, { cascade: true })
  space: Space[];

  @OneToMany(() => PaymentMethod, (payment_method) => payment_method.owner, {
    cascade: true,
  })
  paymentMethod: PaymentMethod[];

  @OneToMany(() => Message, (message) => message.user, { cascade: true })
  messages: Message[];

  @OneToMany(() => Review, (review) => review.space, { cascade: true })
  reviews: Review[];

  @ManyToMany(() => Conversation, (conversation) => conversation.users)
  @JoinTable()
  conversations: Conversation[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 8);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
