import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ActivityService } from './activities.service';
import { CreateActivityDto } from './dto/createActivity';
import { CreateCategoryDto } from './dto/createCategory';
import UpdateActivityDto from './dto/updateActivityDto';
import UpdateCategoryDto from './dto/updateCategory';

@Controller({
  version: '1',
  path: 'activity',
})
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Post('create-category')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.activityService.createCategory(createCategoryDto);
  }

  @Get()
  async getAllActivities(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('orderBySpaces', new DefaultValuePipe(false), ParseBoolPipe)
    orderBySpaces = false,
    @Query(
      'category-ids',
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    ids: string[] = [],
  ) {
    return this.activityService.findAll(
      {
        page,
        limit,
        route: 'api/v1/space',
      },
      ids,
      orderBySpaces,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Patch(':id')
  async updateActivity(
    @Body() updateActivityDto: UpdateActivityDto,
    @Param('id') id: string,
  ) {
    return this.activityService.update(id, updateActivityDto);
  }

  @Get('get-categories')
  async getAllCategories() {
    return this.activityService.findAllCategories();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Post(':id/create-activity')
  async createActivity(
    @Body() createCActivityDto: CreateActivityDto,
    @Param('id') id: string,
  ) {
    return this.activityService.createActivity({
      ...createCActivityDto,
      category_id: id,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Delete(':id/delete-category')
  async deleteActivityCategory(@Param('id') id: string) {
    return this.activityService.deleteCategory(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Post(':id/update-category')
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id') id: string,
  ) {
    return this.activityService.updateCategory(id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Delete(':id')
  async deleteActivity(@Param('id') id: string) {
    return this.activityService.remove(id);
  }
}
