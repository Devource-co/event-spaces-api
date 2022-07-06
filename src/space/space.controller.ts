import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  ParseBoolPipe,
  HttpCode,
  UseInterceptors,
  ParseArrayPipe,
} from '@nestjs/common';
import { SpaceService } from './space.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { TransformInterceptor } from 'src/utils/transform.interceptor';

@Controller({
  version: '1',
  path: 'spaces',
})
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post()
  @HttpCode(201)
  @UseInterceptors(TransformInterceptor)
  create(@Body() createSpaceDto: CreateSpaceDto) {
    return this.spaceService.create(createSpaceDto);
  }

  @Get()
  @HttpCode(200)
  @UseInterceptors(TransformInterceptor)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('published', new DefaultValuePipe(true), ParseBoolPipe)
    published = true,
    @Query(
      'relations',
      new DefaultValuePipe(''),
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    relations = [],
  ) {
    return this.spaceService.findAll(
      {
        page,
        limit,
        route: 'api/v1/space',
      },
      relations,
      published,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.spaceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpaceDto: UpdateSpaceDto) {
    return this.spaceService.update(id, updateSpaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const deleted = this.spaceService.remove(id);
    console.log(deleted);
    return this.spaceService.remove(id);
  }
}
