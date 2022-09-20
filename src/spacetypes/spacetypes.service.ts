import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpacetypeDto } from './dto/create-spacetype.dto';
import { UpdateSpacetypeDto } from './dto/update-spacetype.dto';
import { SpaceType } from './entities/spacetype.entity';

@Injectable()
export class SpacetypesService {
  constructor(
    @InjectRepository(SpaceType)
    private spaceTypeRepository: Repository<SpaceType>,
  ) {}
  async create(createSpacetypeDto: CreateSpacetypeDto) {
    const spaceType = this.spaceTypeRepository.create(createSpacetypeDto);
    await spaceType.save();
    return spaceType;
  }

  findAll() {
    return this.spaceTypeRepository.find();
  }

  findOne(id: string) {
    return this.spaceTypeRepository.findOneBy({ id });
  }

  async update(id: string, updateSpacetypeDto: UpdateSpacetypeDto) {
    await this.spaceTypeRepository.update({ id }, updateSpacetypeDto);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.spaceTypeRepository.delete({ id });
  }
}
