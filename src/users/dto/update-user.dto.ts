import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsAlpha, IsBoolean, IsOptional, IsString } from 'class-validator';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto
  extends PartialType(CreateUserDto)
  implements Partial<User>
{
  @ApiProperty()
  @IsAlpha()
  @IsOptional()
  firstname?: string;

  @ApiProperty()
  @IsAlpha()
  @IsOptional()
  lastname?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty()
  profile_pic?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  connectedToFacebook?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  connectedToGoogle?: boolean;

  @ApiProperty()
  @IsOptional()
  industry_id?: string;

  @ApiProperty()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  jobTitle?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  organization?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  allowNotifications?: boolean;
}
