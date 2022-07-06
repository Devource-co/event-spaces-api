import { Module } from '@nestjs/common';
import { ActivityService } from './activities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
  controllers: [],
  providers: [ActivityService],
  exports: [ActivityService, TypeOrmModule.forFeature([Activity])],
})
export class ActivitiesModule {}
