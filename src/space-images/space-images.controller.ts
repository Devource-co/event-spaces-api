import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SpaceImagesService } from './space-images.service';
import { CreateSpaceImageDto } from './dto/create-space-image.dto';
import { UpdateSpaceImageDto } from './dto/update-space-image.dto';

@Controller({
  version: '1',
  path: 'space-images',
})
export class SpaceImagesController {
  constructor(private readonly spaceImagesService: SpaceImagesService) {}

  @Post()
  create(@Body() createSpaceImageDto: CreateSpaceImageDto) {
    return this.spaceImagesService.create(createSpaceImageDto);
  }

  @Get()
  findAll(@Query('space-id') spaceId = '') {
    return this.spaceImagesService.findAll(spaceId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spaceImagesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpaceImageDto: UpdateSpaceImageDto,
  ) {
    return this.spaceImagesService.update(id, updateSpaceImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spaceImagesService.remove(id);
  }
}
