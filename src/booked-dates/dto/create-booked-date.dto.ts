import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateBookedDateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  start_time: string;

  @ApiProperty()
  @IsNotEmpty()
  end_time: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  booking_id?: string;
}
