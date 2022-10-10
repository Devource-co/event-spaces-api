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
export class Faq extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'text' })
  question: string;

  @Column({ nullable: false, type: 'text' })
  answer: string;

  @Column({ nullable: false })
  space_id: string;

  @ManyToOne(() => Space, { cascade: true })
  @JoinColumn({ name: 'space_id' })
  space?: Space;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
