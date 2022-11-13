import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BookedDatesModule } from '../booked-dates/booked-dates.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), BookedDatesModule],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
