import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dto/createActivity';
import { CreateCategoryDto } from './dto/createCategory';
import UpdateActivityDto from './dto/updateActivityDto';
import UpdateCategoryDto from './dto/updateCategory';
import { Activity } from './entities/activities.entity';
import { CategoryActivity } from './entities/categoryActivities.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(CategoryActivity)
    private categoryRepository: Repository<CategoryActivity>,
  ) {}

  async findAll(
    options: IPaginationOptions,
    categoryIds?: string[],
    orderBySpaces?: boolean,
  ) {
    const filterWithCategories: [any, any] =
      categoryIds.length > 0
        ? ['activity.category_id IN(:...ids)', { ids: categoryIds }]
        : ['', ''];
    const qb = this.activityRepository
      .createQueryBuilder('activity')
      .where(...filterWithCategories)
      .loadRelationCountAndMap(
        'activity.spaceCount',
        'activity.spaces',
        'spaces',
      );
    const results = await paginate<Activity>(qb, options);
    if (orderBySpaces) {
      results.items.sort((a: any, b: any) => b.spaceCount - a.spaceCount);
    }
    return results;
  }

  async findOne(id: string) {
    return this.activityRepository.findOneBy({ id });
  }

  async findAllCategories() {
    return this.categoryRepository.find();
  }

  async createCategory(data: CreateCategoryDto) {
    const category = this.categoryRepository.create(data);
    await category.save();
    return category;
  }

  async createActivity(data: CreateActivityDto) {
    const activity = this.activityRepository.create(data);
    await activity.save();
    return activity;
  }

  async remove(id: string) {
    return this.activityRepository.delete({ id });
  }

  async update(id: string, data: UpdateActivityDto) {
    return this.activityRepository.update({ id }, data);
  }

  async deleteCategory(id: string) {
    return this.categoryRepository.delete({ id });
  }

  async updateCategory(id: string, category: UpdateCategoryDto) {
    return this.activityRepository.update({ id }, category);
  }
}
