import { ApiProperty } from '@nestjs/swagger';
import { SPACE_STATUS } from '../entities/space.entity';
import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty()
  @IsIn(['in review', 'draft', 'active', 'rejected', 'inactive'])
  status: SPACE_STATUS;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  publish?: boolean;

  @ApiProperty()
  @IsString()
  id: string;
}
