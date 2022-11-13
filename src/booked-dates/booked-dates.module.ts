import { Module } from '@nestjs/common';
import { BookedDatesService } from './booked-dates.service';
import { BookedDatesController } from './booked-dates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookedDate } from './entities/booked-date.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookedDate])],
  controllers: [BookedDatesController],
  providers: [BookedDatesService],
  exports: [BookedDatesService],
})
export class BookedDatesModule {}
