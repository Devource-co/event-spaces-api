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
import { Booking } from '../../bookings/entities/booking.entity';

@Entity()
export class BookedDate extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('booked-date-idx')
  @Column({ nullable: false, type: 'date' })
  date: string;

  @Index('booked-start-time-idx')
  @Column({ nullable: false, type: 'time' })
  start_time: string;

  @Index('booked-end-time-idx')
  @Column({ nullable: false, type: 'time' })
  end_time: string;

  @Column({ nullable: false })
  booking_id: string;

  @ManyToOne(() => Booking, (booking) => booking.dates)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
