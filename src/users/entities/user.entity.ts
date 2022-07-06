import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Industry } from './industry.entity';
import { Role } from '../../auth/role.enum';

@Entity()
@Index(['id', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

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

  @Column({ nullable: true, type: 'uuid' })
  industry_id?: string;

  @Index('industry_userId_index')
  @ManyToOne(() => Industry, { cascade: true })
  @JoinColumn({ name: 'industry_id', referencedColumnName: 'id' })
  industry?: Industry;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

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
