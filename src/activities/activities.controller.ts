import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { TransformInterceptor } from '../utils/transform.interceptor';
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
  @UseInterceptors(TransformInterceptor)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.activityService.createCategory(createCategoryDto);
  }

  @Get('get-categories')
  @UseInterceptors(TransformInterceptor)
  async getAllCategories() {
    return this.activityService.findAllCategories();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Post(':id/create-activity')
  @UseInterceptors(TransformInterceptor)
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
  @UseInterceptors(TransformInterceptor)
  async deleteActivityCategory(@Param('id') id: string) {
    return this.activityService.deleteCategory(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Post(':id/update-category')
  @UseInterceptors(TransformInterceptor)
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id') id: string,
  ) {
    return this.activityService.updateCategory(id, updateCategoryDto);
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  async getAllActivities(@Query('category-id') categoryId = null) {
    return this.activityService.findAll(categoryId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Patch(':id')
  @UseInterceptors(TransformInterceptor)
  async updateActivity(
    @Body() updateActivityDto: UpdateActivityDto,
    @Param('id') id: string,
  ) {
    return this.activityService.update(id, updateActivityDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Delete(':id')
  @UseInterceptors(TransformInterceptor)
  async deleteActivity(@Param('id') id: string) {
    return this.activityService.remove(id);
  }
}
