import { Module } from '@nestjs/common';
import { SpaceScheduleService } from './space-schedule.service';
import { SpaceScheduleController } from './space-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceSchedule } from './entities/space-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceSchedule])],
  controllers: [SpaceScheduleController],
  providers: [SpaceScheduleService],
})
export class SpaceScheduleModule {}
