import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Activity } from '../../activities/entities/activities.entity';
import { Address } from '../../address/entities/address.entity';
import { User } from '../../users/entities/user.entity';
import { SpaceType } from '../../spacetypes/entities/spacetype.entity';
import { Amenity } from '../../amenities/entities/amenity.entity';
import { AccessMethod } from '../../access-methods/entities/access-method.entity';
import { SpaceRule } from '../../space-rules/entities/space-rule.entity';
import { SpaceImage } from '../../space-images/entities/space-image.entity';
import { SpaceSchedule } from '../../space-schedule/entities/space-schedule.entity';
import { CancellationPolicy } from '../../cancellation-policy/entities/cancellation-policy.entity';
import { Faq } from '../../faqs/entities/faq.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { Review } from '../../reviews/entities/review.entity';

export enum SPACE_STATUS {
  REVIEW = 'review',
  DRAFT = 'draft',
  ACTIVE = 'active',
  REJECTED = 'rejected',
  INACTIVE = 'inactive',
}

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

  @Index()
  @Column()
  @Generated('increment')
  public_id: number;

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column({ nullable: true })
  cancellation_policy_id?: string;

  @ManyToOne(
    () => CancellationPolicy,
    (cancellationPolicy) => cancellationPolicy.space,
  )
  @JoinColumn({ name: 'cancellation_policy_id' })
  cancellation_policy: CancellationPolicy;

  @ManyToMany(() => Activity, (activity) => activity.spaces, { cascade: true })
  @JoinTable()
  activities?: Activity[];

  @Column({ nullable: false })
  owner_id: string;

  @ManyToOne(() => User, (user) => user.space)
  @JoinColumn({ name: 'owner_id' })
  owner?: Relation<User>;

  @Column({ nullable: true })
  type_id?: string;

  @ManyToOne(() => SpaceType, (spaceType) => spaceType.space)
  @JoinColumn({ name: 'type_id' })
  type?: SpaceType;

  @Column({ nullable: true })
  max_guests?: number;

  @Column({ nullable: true, type: 'decimal' })
  price?: number;

  @Column({ nullable: true })
  minimumDuration?: number;

  @Column({
    nullable: false,
    default: SPACE_STATUS.DRAFT,
    type: 'enum',
    enum: SPACE_STATUS,
  })
  status: SPACE_STATUS;

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

  @Column({ default: 0 })
  avg_rating?: number;

  @Column({ default: false })
  publish?: boolean;

  @OneToMany(() => SpaceImage, (image) => image.space, { cascade: true })
  images?: SpaceImage[];

  @OneToMany(() => SpaceSchedule, (day) => day.space, { cascade: true })
  schedule?: SpaceSchedule[];

  @OneToMany(() => Booking, (booking) => booking.space, { cascade: true })
  bookings?: Booking[];

  @OneToMany(() => Faq, (faq) => faq.space)
  faqs?: Faq[];

  @Column({ nullable: true })
  thumbnail_url?: string;

  @ManyToMany(() => Amenity, (amenity) => amenity.spaces, { cascade: true })
  @JoinTable()
  amenities?: Amenity[];

  @ManyToMany(() => AccessMethod, (method) => method.spaces, { cascade: true })
  @JoinTable()
  accessMethods?: AccessMethod[];

  @OneToMany(() => SpaceRule, (rule) => rule.space, { cascade: true })
  rules?: SpaceRule[];

  @OneToMany(() => Review, (review) => review.space, { cascade: true })
  reviews?: Review[];

  @Column('tsvector', { select: false, default: '' })
  document_with_weights: any;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
