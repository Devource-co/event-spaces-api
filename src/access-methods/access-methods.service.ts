import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccessMethodDto } from './dto/create-access-method.dto';
import { UpdateAccessMethodDto } from './dto/update-access-method.dto';
import { AccessMethod } from './entities/access-method.entity';

@Injectable()
export class AccessMethodsService {
  constructor(
    @InjectRepository(AccessMethod)
    private accessMethodRepository: Repository<AccessMethod>,
  ) {}
  async create(createAcessMethodDto: CreateAccessMethodDto) {
    const accessMethod =
      this.accessMethodRepository.create(createAcessMethodDto);
    await accessMethod.save();
    return accessMethod;
  }

  async findAll() {
    return this.accessMethodRepository.find();
  }

  async findOne(id: string) {
    return this.accessMethodRepository.findOneBy({ id });
  }

  async update(id: string, updateAcessMethodDto: UpdateAccessMethodDto) {
    await this.accessMethodRepository.update({ id }, updateAcessMethodDto);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.accessMethodRepository.delete({ id });
  }
}
