import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { SpacetypesService } from './spacetypes.service';
import { CreateSpacetypeDto } from './dto/create-spacetype.dto';
import { UpdateSpacetypeDto } from './dto/update-spacetype.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller({
  version: '1',
  path: 'spacetypes',
})
export class SpacetypesController {
  constructor(private readonly spacetypesService: SpacetypesService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  create(@Body() createSpacetypeDto: CreateSpacetypeDto) {
    return this.spacetypesService.create(createSpacetypeDto);
  }

  @Get()
  findAll() {
    return this.spacetypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spacetypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpacetypeDto: UpdateSpacetypeDto,
  ) {
    return this.spacetypesService.update(id, updateSpacetypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spacetypesService.remove(id);
  }
}
