import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookedDateDto } from './dto/create-booked-date.dto';
import { UpdateBookedDateDto } from './dto/update-booked-date.dto';
import { BookedDate } from './entities/booked-date.entity';

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
