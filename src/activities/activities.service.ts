import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async findAll(categoryId: string) {
    return this.activityRepository.find({
      ...(categoryId && { where: { category_id: categoryId } }),
    });
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
