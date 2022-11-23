import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Space } from '../../space/entities/space.entity';
import { CategoryActivity } from './categoryActivities.entity';

@Entity()
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  category_id?: string;

  @Column({ nullable: true })
  tags: string;

  @Column({ nullable: true })
  image_url?: string;

  @ManyToOne(() => CategoryActivity)
  @JoinColumn({ name: 'category_id' })
  type: CategoryActivity;

  @ManyToMany(() => Space, (space) => space.activities)
  spaces: Space[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
