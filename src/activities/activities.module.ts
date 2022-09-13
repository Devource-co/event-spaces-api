import { Module } from '@nestjs/common';
import { ActivityService } from './activities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activities.entity';
import { CategoryActivity } from './entities/categoryActivities.entity';
import { ActivityController } from './activities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, CategoryActivity])],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService, TypeOrmModule.forFeature([Activity])],
})
export class ActivitiesModule {}
