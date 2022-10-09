import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpException,
  HttpStatus,
  ParseArrayPipe,
} from '@nestjs/common';
import { SpaceScheduleService } from './space-schedule.service';
import { CreateSpaceScheduleDto } from './dto/create-space-schedule.dto';
import { UpdateSpaceScheduleDto } from './dto/update-space-schedule.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller({
  version: '1',
  path: 'space-schedule',
})
export class SpaceScheduleController {
  constructor(private readonly spaceScheduleService: SpaceScheduleService) {}

  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSpaceScheduleDto: CreateSpaceScheduleDto) {
    return this.spaceScheduleService.create(createSpaceScheduleDto);
  }

  @Get()
  findAll() {
    return this.spaceScheduleService.findAll();
  }

  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @Post('create-week')
  createWeek(
    @Body(new ParseArrayPipe({ items: CreateSpaceScheduleDto }))
    createSpaceScheduleDto: CreateSpaceScheduleDto[],
  ) {
    if (createSpaceScheduleDto.length > 7) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: `Too many days, a week should have seven days`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return this.spaceScheduleService.createWeek(createSpaceScheduleDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spaceScheduleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpaceScheduleDto: UpdateSpaceScheduleDto,
  ) {
    return this.spaceScheduleService.update(id, updateSpaceScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spaceScheduleService.remove(id);
  }
}
