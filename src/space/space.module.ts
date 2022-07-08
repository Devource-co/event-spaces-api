import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceController } from './space.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from './entities/space.entity';
import { FilesModule } from '../files/files.module';
import { AddressModule } from '../address/address.module';
import { ActivitiesModule } from '../activities/activities.module';
import { SpaceType } from './entities/spaceType.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Space, SpaceType]),
    FilesModule,
    AddressModule,
    ActivitiesModule,
  ],
  controllers: [SpaceController],
  providers: [SpaceService],
  exports: [SpaceService],
})
export class SpaceModule {}
