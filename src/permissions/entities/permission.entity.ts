import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  // ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { Role } from '../../roles/entities/role.entity';

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  read: boolean;

  // @ManyToMany(() => Role, (staff) => staff.roles)
  // roles: Role[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
