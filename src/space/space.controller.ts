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
  ParseArrayPipe,
  HttpStatus,
  HttpException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SpaceService } from './space.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller({
  version: '1',
  path: 'spaces',
})
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  create(@Body() createSpaceDto: CreateSpaceDto, @Request() req) {
    const userId = req.user?.id;
    return this.spaceService.create(createSpaceDto, userId);
  }

  @Get()
  @HttpCode(200)
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
    const space = await this.spaceService.findOne(id);
    if (!space) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Space does not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return space;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpaceDto: UpdateSpaceDto,
    @Request() req,
  ) {
    const userId = req.user?.id;
    return this.spaceService.update(id, updateSpaceDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spaceService.remove(id);
  }
}
