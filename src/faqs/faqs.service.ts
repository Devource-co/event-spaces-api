import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { Faq } from './entities/faq.entity';

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(Faq)
    private faqRepository: Repository<Faq>,
  ) {}
  async create(createFaqDto: CreateFaqDto) {
    const faq = this.faqRepository.create(createFaqDto);
    await faq.save();
    return faq;
  }

  async createBulk(createFaqDto: CreateFaqDto[]) {
    const faqsEntities = this.faqRepository.create(createFaqDto);
    await this.faqRepository.save(faqsEntities);
    return faqsEntities;
  }

  findAll() {
    return this.faqRepository.find();
  }

  findOne(id: string) {
    return this.faqRepository.findBy({ id });
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    const faq = await this.findOne(id);
    if (faq) {
      return this.faqRepository.save({
        ...faq,
        ...updateFaqDto,
      });
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: `space schedule with id ${id} not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  remove(id: string) {
    return this.faqRepository.delete({ id });
  }
}
