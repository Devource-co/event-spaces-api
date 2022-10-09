import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpaceImageDto } from './dto/create-space-image.dto';
import { UpdateSpaceImageDto } from './dto/update-space-image.dto';
import { SpaceImage } from './entities/space-image.entity';

@Injectable()
export class SpaceImagesService {
  constructor(
    @InjectRepository(SpaceImage)
    private spaceImagesRepository: Repository<SpaceImage>,
  ) {}
  async create(createSpaceImageDto: CreateSpaceImageDto) {
    const image = this.spaceImagesRepository.create(createSpaceImageDto);
    await image.save();
    return image;
  }

  findAll() {
    return this.spaceImagesRepository.find();
  }

  findOne(id: string) {
    return this.spaceImagesRepository.findOneBy({ id });
  }

  update(id: string, updateSpaceImageDto: UpdateSpaceImageDto) {
    return this.spaceImagesRepository.update(id, updateSpaceImageDto);
  }

  remove(id: string) {
    return this.spaceImagesRepository.delete({ id });
  }
}
