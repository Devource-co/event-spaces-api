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

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  review: string;

  @Column({ type: 'int', default: 0 })
  rating: number;

  @Column()
  space_id: string;

  @ManyToOne(() => Space, (space) => space.reviews, { cascade: false })
  @JoinColumn({ name: 'space_id' })
  space?: Space;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.reviews, { cascade: false })
  @JoinColumn({ name: 'user_id' })
  reviewer?: User;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
