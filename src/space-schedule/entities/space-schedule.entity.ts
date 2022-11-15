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
import { Space } from '../../space/entities/space.entity';

@Entity()
export class SpaceSchedule extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('space-day-idx')
  @Column({ nullable: false, type: 'smallint' })
  day: number;

  @Column({ nullable: false })
  space_id: string;

  @ManyToOne(() => Space, (space) => space.schedule)
  @JoinColumn({ name: 'space_id' })
  space: Space;

  @Column({ nullable: false, type: 'boolean', default: false })
  is_set_time: boolean;

  @Index('space-opening-time-idx')
  @Column({ nullable: true, type: 'time' })
  opening_time?: string;

  @Index('space-closing-time-idx')
  @Column({ nullable: true, type: 'time' })
  closing_time?: string;

  @Column({ nullable: true })
  isOpened?: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
