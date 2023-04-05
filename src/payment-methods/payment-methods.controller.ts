import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller({
  path: 'payment-methods',
  version: '1',
})
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createPaymentMethodDto: CreatePaymentMethodDto,
    @Request() req,
  ) {
    const userId = req.user?.id;
    return this.paymentMethodsService.create(createPaymentMethodDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    const userId = req.user?.id;
    return this.paymentMethodsService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user?.id;
    return this.paymentMethodsService.findOne(id, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
    @Request() req,
  ) {
    const userId = req.user?.id;
    return this.paymentMethodsService.update(
      id,
      updatePaymentMethodDto,
      userId,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user?.id;
    return this.paymentMethodsService.remove(id, userId);
  }
}
