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
import { SPACE_STATUS } from './entities/space.entity';
import { JwtAuthStaffGuard } from '../auth/jwt-authStaff.guard';
import { UpdateStatusDto } from './dto/update-status.dto';
import { CreateAddressDto } from '../address/dto/create-address.dto';

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
    @Query('status', new DefaultValuePipe(SPACE_STATUS.ACTIVE))
    status: SPACE_STATUS | 'all' = SPACE_STATUS.ACTIVE,
    @Query(
      'relations',
      new DefaultValuePipe(''),
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    relations = [],
    // @Query('order', new DefaultValuePipe("created")) order:
  ) {
    if (relations.length === 1 && !relations[0]) relations = [];
    return this.spaceService.findAll(
      {
        page,
        limit,
        route: `/space?status=${status}${
          relations.length ? `relation=${relations.join(',')}` : ''
        }`,
      },
      relations,
      status,
    );
  }

  @Get('/search')
  @HttpCode(200)
  async searchSpace(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('activity', new DefaultValuePipe('')) activity: string,
    @Query('status', new DefaultValuePipe(SPACE_STATUS.ACTIVE))
    status: SPACE_STATUS | 'all' = SPACE_STATUS.ACTIVE,
    @Query(
      'coords',
      new DefaultValuePipe(''),
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    coords: [string, string],
    @Query('type-space', new DefaultValuePipe('')) typeSpace: string,
    @Query('range', new DefaultValuePipe(100), ParseIntPipe) distance: number,
    @Query('q', new DefaultValuePipe('')) q: string,
  ) {
    return this.spaceService.searchSpace({
      options: {
        page,
        limit,
        route: 'api/v1/space',
      },
      q,
      activity,
      typeSpace,
      status,
      coords,
      distance,
    });
  }

  @Get('/owner')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async findAllByOwner(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query(
      'relations',
      new DefaultValuePipe(''),
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    relations = [],
    @Query('status', new DefaultValuePipe('all'))
    status: SPACE_STATUS | 'all' = SPACE_STATUS.ACTIVE,
    @Request() req,
  ) {
    const userId = req.user?.id;
    return this.spaceService.findAllByUser(
      {
        page,
        limit,
        route: `/space/owner?status=${status}&${
          relations.length ? `relation=${relations.join(',')}` : ''
        }`,
      },
      relations,
      userId,
      status,
    );
  }

  @Post('/update-status')
  @HttpCode(200)
  @UseGuards(JwtAuthStaffGuard)
  updateStatus(@Body() updateStatusDto: UpdateStatusDto) {
    return this.spaceService.updateStatus(updateStatusDto);
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

  @Post('space-address')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  createSpaceAddress(
    @Body() createSpaceAddressDto: CreateAddressDto,
    @Request() req,
  ) {
    const userId = req.user?.id;
    return this.spaceService.createSpaceAdress(createSpaceAddressDto, userId);
  }
}
