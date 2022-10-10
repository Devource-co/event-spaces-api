import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFaqDto {
  @ApiProperty()
  @IsNotEmpty()
  question: string;

  @ApiProperty()
  @IsNotEmpty()
  answer: string;

  @ApiProperty()
  @IsNotEmpty()
  space_id: string;

  @ApiProperty()
  @IsOptional()
  id: string;
}
