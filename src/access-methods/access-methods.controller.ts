import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccessMethodsService } from './access-methods.service';
import { CreateAccessMethodDto } from './dto/create-access-method.dto';
import { UpdateAccessMethodDto } from './dto/update-access-method.dto';

@Controller({
  version: '1',
  path: 'access-methods',
})
export class AccessMethodsController {
  constructor(private readonly accessMethodsService: AccessMethodsService) {}

  @Post()
  create(@Body() createAccessMethodDto: CreateAccessMethodDto) {
    return this.accessMethodsService.create(createAccessMethodDto);
  }

  @Get()
  findAll() {
    return this.accessMethodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessMethodsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccessMethodDto: UpdateAccessMethodDto,
  ) {
    return this.accessMethodsService.update(id, updateAccessMethodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessMethodsService.remove(id);
  }
}
