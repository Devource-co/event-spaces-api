import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateActivityDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  category_id?: string;

  @ApiProperty()
  @IsOptional()
  image_url?: string;

  @ApiProperty()
  @IsOptional()
  tags?: string;
}
