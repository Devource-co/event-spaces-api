import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDecimal,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateBookedDateDto } from '../../booked-dates/dto/create-booked-date.dto';
import { BOOKING_STATUS, PAYMENT_STATUS } from '../entities/booking.entity';

export class CreateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  space_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDecimal()
  total: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  duration: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn(['paid', 'pending', 'failed', 'cancelled'])
  payment_status?: PAYMENT_STATUS;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  payment_id?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn(['pending', 'payment_waiting', 'booked', 'rejected', 'cancelled'])
  booking_status?: BOOKING_STATUS;

  @ApiPropertyOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBookedDateDto)
  bookedDates?: CreateBookedDateDto[];
}
