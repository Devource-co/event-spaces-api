import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, ValidateIf } from 'class-validator';
import { CARD_TYPE, PAYMENT_TYPE } from '../entities/payment-method.entity';

export class CreatePaymentMethodDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsIn(['card', 'mpesa'])
  payment_type: PAYMENT_TYPE;

  @ApiProperty()
  @ValidateIf((o) => o.payment_type === 'card')
  @IsNotEmpty()
  accountNumber?: number;

  @ApiProperty()
  @ValidateIf((o) => o.payment_type === 'card')
  @IsNotEmpty()
  cvv?: number;

  @ApiProperty()
  @ValidateIf((o) => o.payment_type === 'card')
  @IsNotEmpty()
  expiration?: string;

  @ApiProperty()
  @ValidateIf((o) => o.payment_type === 'card')
  @IsNotEmpty()
  @IsIn(['amex', 'visa', 'discover', 'mastercard'])
  card_type?: CARD_TYPE;

  @ApiProperty()
  @IsNotEmpty()
  maskedAccountNumber: string;

  @ApiProperty()
  @ValidateIf((o) => o.payment_type === 'mpesa')
  @IsNotEmpty()
  phoneNumber?: string;
}
