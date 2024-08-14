import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Point } from 'geojson';
import { Space } from '../../space/entities/space.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  street?: string;

  @Column({ nullable: true })
  place?: string;

  @Column({ nullable: true })
  town?: string;

  @Column({ nullable: true })
  zip_code?: string;

  @Column({ type: 'double precision', name: 'd_lat', nullable: true })
  lat: number;

  @Column({ type: 'double precision', name: 'd_long', nullable: true })
  long: number;

  @OneToOne(() => Space, (space) => space.address, {
    onDelete: 'CASCADE',
  })
  space?: Relation<Space>;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point;

  @Column({ select: false, nullable: true, insert: false, update: false })
  distance?: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
