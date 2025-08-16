import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressRangeQueryDTO } from './dto/address-query';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { isUUID } from 'class-validator';

@Controller({
  version: '1',
  path: 'address',
})
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('create')
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get('range')
  @UsePipes(new ValidationPipe({ transform: true }))
  getRange(@Query() query: AddressRangeQueryDTO) {
    const { lat, long, range } = query;
    return this.addressService.getRange(lat, long, range);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    if (!isUUID(id)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid UUID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}
