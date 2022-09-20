import { File } from '../../files/entities/files.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Activity } from '../../activities/entities/activities.entity';
import { Address } from '../../address/entities/address.entity';
import { User } from '../../users/entities/user.entity';
import { SpaceType } from '../../spacetypes/entities/spacetype.entity';
import { Amenity } from '../../amenities/entities/amenity.entity';
import { AccessMethod } from '../../access-methods/entities/access-method.entity';
import { SpaceRule } from '../../space-rules/entities/space-rule.entity';

@Entity()
export class Space extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  youtube_url?: string;

  @Column({ nullable: true })
  address_id?: string;

  @OneToOne(() => Address, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @ManyToMany(() => Activity, (activity) => activity.id, { cascade: true })
  @JoinTable()
  activities?: Activity[];

  @Column({ nullable: false })
  owner_id: string;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'owner_id' })
  owner?: User;

  @Column({ nullable: true })
  type_id?: string;

  @ManyToOne(() => SpaceType, { cascade: true })
  @JoinColumn({ name: 'type_id' })
  type?: SpaceType;

  @Column({ nullable: true })
  max_guests?: number;

  @Column({ nullable: true })
  property_size?: string;

  @Column({ nullable: true })
  parking_slots?: number;

  @Column({ nullable: true })
  onproperty_parking?: boolean;

  @Column({ nullable: true })
  street_parking?: boolean;

  @Column({ nullable: true, type: 'boolean' })
  parking_close?: boolean;

  @Column({ default: -1 })
  avg_rating?: number;

  @Column({ default: false })
  publish?: boolean;

  @ManyToMany(() => File, (file) => file.id, { cascade: true })
  @JoinTable()
  images?: File[];

  @Column({ nullable: true })
  thumbnail_id?: string;

  @OneToOne(() => File)
  @JoinColumn({ name: 'thumbnail_id' })
  thumbNail?: File;

  @ManyToMany(() => Amenity, (amenity) => amenity.id, { cascade: true })
  @JoinTable()
  amenities?: Amenity[];

  @ManyToMany(() => AccessMethod, (method) => method.id, { cascade: true })
  @JoinTable()
  accessMethods?: AccessMethod[];

  @OneToMany(() => SpaceRule, (rule) => rule.space)
  rules?: SpaceRule[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
