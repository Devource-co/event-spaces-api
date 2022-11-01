import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Space } from '../../space/entities/space.entity';
import { User } from '../../users/entities/user.entity';

export enum PAYMENT_STATUS {
  PAID = 'paid',
  PENDING = 'pending',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum BOOKING_STATUS {
  PENDING = 'pending',
  PAYMENT_WAITING = 'payment_waiting',
  BOOKED = 'booked',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

@Entity()
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column('uuid')
  space_id: string;

  @ManyToOne(() => Space, { cascade: true })
  @JoinColumn({ name: 'space_id', referencedColumnName: 'id' })
  space: Space;

  @Column({ type: 'decimal' })
  total?: number;

  @Column({
    type: 'enum',
    enum: PAYMENT_STATUS,
    default: PAYMENT_STATUS.PENDING,
  })
  payment_status?: PAYMENT_STATUS;

  @Column({
    type: 'enum',
    enum: BOOKING_STATUS,
    default: BOOKING_STATUS.PENDING,
  })
  booking_status?: BOOKING_STATUS;

  @Column('uuid')
  payment_id: string;

  @Column('int')
  duration: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
