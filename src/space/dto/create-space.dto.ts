import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDto } from '../../address/dto/create-address.dto';

export class CreateSpaceDto {
  @ApiProperty()
  title?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  youtube_url?: string;

  @ApiProperty()
  max_guests?: string;

  @ApiProperty()
  property_size?: string;

  @ApiProperty()
  parking_slots?: number;

  @ApiProperty()
  onproperty_parking?: boolean;

  @ApiProperty()
  street_parking?: boolean;

  @ApiProperty()
  parking_close?: boolean;

  @ApiProperty()
  address_id?: string;

  @ApiProperty()
  type_id?: string;

  @ApiProperty()
  activities?: any[];

  @ApiProperty()
  file_id?: string[];

  @ApiProperty()
  avg_rating?: number;

  @ApiProperty()
  publish?: boolean;

  @ApiProperty()
  thumbnail_id?: string;

  @ApiProperty()
  images?: any[];

  @ApiProperty()
  address?: CreateAddressDto;
}
