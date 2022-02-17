import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Advert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  title: string;
}
