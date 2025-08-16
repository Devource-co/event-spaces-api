import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum BLOG_TYPE {
  BLOG = 'blog',
  SUPPORT = 'support',
  GUIDE = 'guide',
  NEWS = 'news',
  OTHERS = 'others',
}

@Entity()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'text' })
  content: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false })
  thumbnail: string;

  @Column({ type: 'text', array: true })
  tags: string[];

  @Column({
    type: 'enum',
    default: BLOG_TYPE.BLOG,
    nullable: false,
    enum: BLOG_TYPE,
  })
  type: BLOG_TYPE;

  @Generated('increment')
  @Column()
  public_id: number;

  @Column({ type: 'boolean', default: false })
  featured?: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
