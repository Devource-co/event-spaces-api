import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PaymentMethod } from './entities/payment-method.entity';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async create(createPaymentMethodDto: CreatePaymentMethodDto, userId: string) {
    const paymentMethod = this.paymentMethodRepository.create({
      owner_id: userId,
      ...createPaymentMethodDto,
    });
    await paymentMethod.save();
    return paymentMethod;
  }

  findAll(userId: string) {
    return this.paymentMethodRepository.find({ where: { owner_id: userId } });
  }

  findOne(id: string, userId: string) {
    const paymentMethod = this.paymentMethodRepository.findOne({
      where: {
        owner_id: userId,
        id,
      },
    });
    if (!paymentMethod) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `payment method with id ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return paymentMethod;
  }

  async update(
    id: string,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
    userId: string,
  ) {
    await this.findOne(id, userId);
    await this.paymentMethodRepository.save({
      ...updatePaymentMethodDto,
      id,
      owner_id: userId,
    });
    return this.findOne(id, userId);
  }

  remove(id: string, userId: string) {
    const paymentMethod = this.paymentMethodRepository.findOne({
      where: {
        owner_id: userId,
        id,
      },
    });
    if (!paymentMethod) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `payment method with id ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return this.paymentMethodRepository.delete(id);
  }
}
