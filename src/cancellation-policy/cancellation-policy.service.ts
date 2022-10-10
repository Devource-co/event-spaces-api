import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCancellationPolicyDto } from './dto/create-cancellation-policy.dto';
import { UpdateCancellationPolicyDto } from './dto/update-cancellation-policy.dto';
import { CancellationPolicy } from './entities/cancellation-policy.entity';

@Injectable()
export class CancellationPolicyService {
  constructor(
    @InjectRepository(CancellationPolicy)
    private cancellationPolicyRepository: Repository<CancellationPolicy>,
  ) {}
  async create(createCancellationPolicyDto: CreateCancellationPolicyDto) {
    const policy = this.cancellationPolicyRepository.create(
      createCancellationPolicyDto,
    );
    await policy.save();
    return policy;
  }

  findAll() {
    return this.cancellationPolicyRepository.find();
  }

  findOne(id: string) {
    return this.cancellationPolicyRepository.findBy({ id });
  }

  async update(
    id: string,
    updateCancellationPolicyDto: UpdateCancellationPolicyDto,
  ) {
    const policy = await this.findOne(id);
    if (policy) {
      return this.cancellationPolicyRepository.save({
        ...policy,
        ...updateCancellationPolicyDto,
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
    return this.cancellationPolicyRepository.delete({ id });
  }
}
