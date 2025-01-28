import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class Staff extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password?: string;

  @Column({ nullable: false })
  firstname?: string;

  @Column({ nullable: false })
  lastname?: string;

  @Column({ nullable: false, unique: true })
  phone?: string;

  @Column({ nullable: true })
  profile_pic?: string;

  @Column({ default: false })
  isPasswordUpdated: boolean;

  @ManyToOne(() => Role, (role) => role.staffs, { cascade: true })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
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
