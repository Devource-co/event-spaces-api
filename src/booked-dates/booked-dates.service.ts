import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs = require('dayjs');
import timezone = require('dayjs/plugin/timezone');
import utc = require('dayjs/plugin/utc');
import { Repository } from 'typeorm';
import { CreateBookedDateDto } from './dto/create-booked-date.dto';
import { UpdateBookedDateDto } from './dto/update-booked-date.dto';
import { BookedDate } from './entities/booked-date.entity';

dayjs.extend(timezone);
dayjs.extend(utc);

@Injectable()
export class BookedDatesService {
  constructor(
    @InjectRepository(BookedDate)
    private bookedDateRepository: Repository<BookedDate>,
  ) {}
  async create(createBookedDateDto: CreateBookedDateDto) {
    const bookedDate = this.bookedDateRepository.create(createBookedDateDto);
    bookedDate.save();
    return bookedDate;
  }

  async findBookedSpaceDate(spaceId: string) {
    const now = dayjs()
      .subtract(1, 'd')
      .tz('Africa/Nairobi')
      .format('YYYY-MM-DD HH:mm:ss');
    return this.bookedDateRepository
      .createQueryBuilder('bookedDates')
      .leftJoin('bookedDates.booking', 'booking')
      .leftJoin('booking.space', 'space')
      .where('space.id = :spaceId', { spaceId })
      .andWhere("CONCAT(date,' ',start_time)::timestamp  >= :now", { now })
      .getMany();
  }

  findAll() {
    return this.bookedDateRepository.find();
  }

  findOne(id: string) {
    return this.bookedDateRepository.findOneBy({ id });
  }

  async update(id: string, updateBookedDateDto: UpdateBookedDateDto) {
    return `This action updates a #${id} bookedDate`;
  }

  remove(id: string) {
    return this.bookedDateRepository.delete({ id });
  }

  async createBulk(createBookedDateDto: CreateBookedDateDto[]) {
    const bookedDatesEntities =
      this.bookedDateRepository.create(createBookedDateDto);
    await this.bookedDateRepository.save(bookedDatesEntities);
    return bookedDatesEntities;
  }
}
