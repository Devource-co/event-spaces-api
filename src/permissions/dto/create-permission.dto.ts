import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  read: boolean;

  @ApiProperty()
  write: boolean;

  @ApiProperty()
  delete: boolean;
}
