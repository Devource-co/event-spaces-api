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

@Entity()
export class SpaceSchedule extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'smallint' })
  day: number;

  @Column({ nullable: false })
  space_id: string;

  @ManyToOne(() => Space, { cascade: true })
  @JoinColumn({ name: 'space_id' })
  space: Space;

  @Column({ nullable: false, type: 'boolean', default: false })
  is_set_time: boolean;

  @Column({ nullable: true, type: 'time' })
  opening_time?: string;

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
