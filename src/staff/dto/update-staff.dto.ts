import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStaffDto } from './create-staff.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {
  @ApiProperty()
  @IsNotEmpty()
  profile_pic?: string;
}
