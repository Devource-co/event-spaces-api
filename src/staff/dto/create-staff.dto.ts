import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateStaffDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'password should have at least 8 characters',
  })
  password?: string;

  @ApiProperty()
  @IsNotEmpty()
  firstname?: string;

  @ApiProperty()
  @IsNotEmpty()
  lastname?: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone?: string;

  @ApiProperty()
  profile_pic?: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  role_id: string;
}
