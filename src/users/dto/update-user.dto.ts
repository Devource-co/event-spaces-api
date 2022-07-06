import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Role } from '../../auth/role.enum';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto
  extends PartialType(CreateUserDto)
  implements Partial<User>
{
  @ApiProperty()
  firstname?: string;

  @ApiProperty()
  lastname?: string;

  @ApiProperty()
  email_verified?: boolean;

  @ApiProperty()
  bio?: string;

  @ApiProperty()
  profile_pic?: string;

  @ApiProperty()
  connectedToFacebook?: boolean;

  @ApiProperty()
  connectedToGoogle?: boolean;

  @ApiProperty()
  industry_id?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  phone_verified?: boolean;

  @ApiProperty()
  role?: Role;
}
