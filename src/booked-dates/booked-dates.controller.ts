import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseArrayPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookedDatesService } from './booked-dates.service';
import { CreateBookedDateDto } from './dto/create-booked-date.dto';
import { UpdateBookedDateDto } from './dto/update-booked-date.dto';

@Controller({
  path: 'booked-dates',
  version: '1',
})
export class BookedDatesController {
  constructor(private readonly bookedDatesService: BookedDatesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createBookedDateDto: CreateBookedDateDto) {
    return this.bookedDatesService.create(createBookedDateDto);
  }

  @Post('bulk-create')
  @UseGuards(JwtAuthGuard)
  createBulk(
    @Body(new ParseArrayPipe({ items: CreateBookedDateDto }))
    createBookedDateDto: CreateBookedDateDto[],
  ) {
    return this.bookedDatesService.createBulk(createBookedDateDto);
  }

  @Get()
  findAll() {
    return this.bookedDatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookedDatesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookedDateDto: UpdateBookedDateDto,
  ) {
    return this.bookedDatesService.update(id, updateBookedDateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookedDatesService.remove(id);
  }
}
