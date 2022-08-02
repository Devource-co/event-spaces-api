import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Point } from 'geojson';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    const pointObject: Point = {
      type: 'Point',
      coordinates: [createAddressDto.long, createAddressDto.lat],
    };
    createAddressDto.location = pointObject;
    return this.addressRepository.save(createAddressDto);
  }

  async findAll() {
    return this.addressRepository.find();
  }

  async findOne(id: string) {
    return this.addressRepository.findOneBy({ id });
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    if (updateAddressDto.lat && updateAddressDto.long) {
      const pointObject: Point = {
        type: 'Point',
        coordinates: [updateAddressDto.long, updateAddressDto.lat],
      };
      updateAddressDto.location = pointObject;
    }
    await this.addressRepository.update({ id }, updateAddressDto);
    return this.addressRepository.findOneBy({ id });
  }

  remove(id: string) {
    return this.addressRepository.delete({ id });
  }

  async getRange(lat: number, long: number, range = 1000) {
    const origin = {
      type: 'Point',
      coordinates: [long, lat],
    };
    const locations = await this.addressRepository
      .createQueryBuilder('t_test_location')
      .select([
        'country',
        'street',
        'town',
        'place',
        'id',
        'ST_AsGeoJSON(location)::jsonb AS location',
        't_test_location.d_lat AS lat',
        't_test_location.d_long AS long',
        'ST_Distance(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)))/1000 AS distance',
      ])
      .where(
        'ST_DWithin(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)) , :range)',
      )
      .orderBy('distance', 'ASC')
      .setParameters({
        origin: JSON.stringify(origin),
        range: range * 1000,
      })
      .getRawMany();
    return locations;
  }
}
