import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { Rate } from './entities/rate.entity';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate)
    private rateRepository: Repository<Rate>,
  ) {}
  async create(createRateDto: CreateRateDto) {
    const rate = this.rateRepository.create(createRateDto);
    await rate.save();
    return rate;
  }

  findAll() {
    return this.rateRepository.find();
  }

  findOne(id: string) {
    return this.rateRepository.findBy({ id });
  }

  async update(id: string, updateRateDto: UpdateRateDto) {
    const policy = await this.findOne(id);
    if (policy) {
      return this.rateRepository.save({
        ...policy,
        ...updateRateDto,
      });
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: `Policy with id ${id} not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  remove(id: string) {
    return this.rateRepository.delete({ id });
  }
}
