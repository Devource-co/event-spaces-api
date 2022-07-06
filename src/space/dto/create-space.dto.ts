import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsInt, IsString } from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class CreateSpaceDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  youtube_url?: string;

  @ApiProperty()
  max_guests?: string;

  @ApiProperty()
  property_size?: string;

  @ApiProperty()
  @IsInt()
  parking_slots?: number;

  @ApiProperty()
  @IsBoolean()
  onproperty_parking?: boolean;

  @ApiProperty()
  @IsBoolean()
  street_parking?: boolean;

  @ApiProperty()
  @IsBoolean()
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
