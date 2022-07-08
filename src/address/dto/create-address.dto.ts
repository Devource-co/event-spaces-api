import { ApiProperty } from '@nestjs/swagger';
import { Point } from 'geojson';

export class CreateAddressDto {
  @ApiProperty()
  country?: string;

  @ApiProperty()
  street?: string;

  @ApiProperty()
  place?: string;

  @ApiProperty()
  town?: string;

  @ApiProperty()
  zip_code?: string;

  @ApiProperty()
  location?: Point;
}
