import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, ValidateIf } from 'class-validator';

export class CreateSpaceScheduleDto {
  @IsNotEmpty()
  @IsNumber()
  day: number;

  @ApiProperty()
  @IsNotEmpty()
  space_id: string;

  @IsOptional()
  is_set_time?: boolean;

  @ApiProperty()
  @ValidateIf((o) => o.is_set_time === true)
  @IsNotEmpty()
  opening_time?: string;

  @ApiProperty()
  @ValidateIf((o) => o.is_set_time === true)
  @IsNotEmpty()
  closing_time?: string;
}
