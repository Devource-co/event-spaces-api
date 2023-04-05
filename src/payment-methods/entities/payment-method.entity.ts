import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum PAYMENT_TYPE {
  CARD = 'card',
  MPESA = 'mpesa',
}

export enum CARD_TYPE {
  AMEX = 'amex',
  DISCOVER = 'discover',
  MASTERCARD = 'mastercard',
  VISA = 'visa',
}

@Entity()
export class PaymentMethod extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  accountNumber?: number;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  cvv?: number;

  @Column({ nullable: true })
  expiration?: string;

  @Column({ nullable: true })
  paypalEmail?: string;

  @Column({ nullable: false })
  maskedAccountNumber: string;

  @Column({ nullable: false, type: 'enum', enum: PAYMENT_TYPE })
  payment_type: PAYMENT_TYPE;

  @Column({ nullable: true, type: 'enum', enum: CARD_TYPE })
  card_type?: CARD_TYPE;

  @Index()
  @Column({ nullable: false })
  owner_id: string;

  @ManyToOne(() => User, (user) => user.paymentMethod)
  @JoinColumn({ name: 'owner_id' })
  owner?: User;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
