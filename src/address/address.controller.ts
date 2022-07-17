import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TransformInterceptor } from '../utils/transform.interceptor';
import { AddressService } from './address.service';
import { AddressRangeQueryDTO } from './dto/address-query';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller({
  version: '1',
  path: 'address',
})
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('create')
  @UseInterceptors(TransformInterceptor)
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  findAll() {
    return this.addressService.findAll();
  }

  @Get('range')
  @UseInterceptors(TransformInterceptor)
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
  @UseInterceptors(TransformInterceptor)
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}
