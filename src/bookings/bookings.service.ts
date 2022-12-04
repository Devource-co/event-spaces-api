import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Not, Repository } from 'typeorm';
import { BookedDatesService } from '../booked-dates/booked-dates.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private bookedDateService: BookedDatesService,
  ) {}
  async create(createBookingDto: CreateBookingDto, userId: string) {
    const invalidPayload = await this.checkIfBookingDatesValid(
      createBookingDto.bookedDates,
      createBookingDto.space_id,
    );
    if (invalidPayload) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Please recheck the dates and time, and try again',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const { bookedDates, ...bookingPayload } = createBookingDto;
    const booking = this.bookingRepository.create({
      ...bookingPayload,
      user_id: userId,
    });

    await booking.save();
    const bookingId = booking.id;

    const bookingDates = bookedDates.map((date) => ({
      ...date,
      booking_id: bookingId,
    }));
    const bookings = await this.bookedDateService.createBulk(bookingDates);
    booking.dates = bookings;
    return booking;
  }

  findAll() {
    return this.bookingRepository.find({
      relations: {
        dates: true,
      },
    });
  }

  findOne(id: string) {
    return this.bookingRepository.findOne({
      where: { id },
      relations: {
        dates: true,
      },
    });
  }

  async update(id: string, updateBookingDto: UpdateBookingDto, userId: string) {
    const booking = await this.bookingRepository.findOne({
      where: {
        id,
      },
      relations: {
        dates: true,
      },
    });
    if (booking.user_id !== userId) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Unable to edit, booking does not belong to you.',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const dataUpdate = {
      ...booking,
      ...updateBookingDto,
    };
    return this.bookingRepository.save(dataUpdate);
  }

  remove(id: string) {
    return this.bookingRepository.softDelete(id);
  }

  private async checkIfBookingDatesValid(bookedDates: any[], spaceId: string) {
    const results = await Promise.all(
      bookedDates.map(
        (dateBook) =>
          new Promise(async (resolve) => {
            const { date, start_time, end_time } = dateBook;
            const validateBookings: any = await this.bookingRepository
              .createQueryBuilder('booking')
              .innerJoinAndSelect('booking.dates', 'dates')
              .innerJoin('booking.space', 'space')
              .innerJoin('space.schedule', 'schedule', 'schedule.day = :day', {
                day: new Date(date).getDay(),
              })
              .where('dates.date = :date', { date })
              .andWhere(
                new Brackets((q) => {
                  q.where(
                    new Brackets((qb) => {
                      qb.where('dates.start_time <= :end_time').andWhere(
                        'dates.end_time >= :start_time',
                      );
                    }),
                  ).orWhere(
                    `NOT((
                  :start_time BETWEEN schedule.opening_time 
                  AND schedule.closing_time) 
                  AND (:end_time BETWEEN schedule.opening_time 
                AND schedule.closing_time))`,
                  );
                }),
              )

              .andWhere('booking.space_id = :spaceId')
              .setParameters({
                start_time,
                end_time,
                spaceId,
              })
              .getMany();
            console.log(validateBookings);
            resolve(validateBookings.length > 0);
          }),
      ),
    );
    return results.includes(true);
  }
}
