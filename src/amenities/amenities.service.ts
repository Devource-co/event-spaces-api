import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { Amenity } from './entities/amenity.entity';

@Injectable()
export class AmenitiesService {
  constructor(
    @InjectRepository(Amenity)
    private amenityRepository: Repository<Amenity>,
  ) {}
  async create(createAmenityDto: CreateAmenityDto) {
    const amenity = this.amenityRepository.create(createAmenityDto);
    await amenity.save();
    return amenity;
  }

  findAll() {
    return this.amenityRepository.find();
  }

  findOne(id: string) {
    return this.amenityRepository.findOneBy({ id });
  }

  async update(id: string, updateAmenityDto: UpdateAmenityDto) {
    const amenity = await this.findOne(id);
    if (amenity) {
      return this.amenityRepository.save({
        ...amenity,
        ...updateAmenityDto,
      });
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: `Amenity with id ${id} not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  remove(id: string) {
    return this.amenityRepository.delete({ id });
  }
}
