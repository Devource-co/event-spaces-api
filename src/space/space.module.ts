import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceController } from './space.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from './entities/space.entity';
import { FilesModule } from 'src/files/files.module';
import { AddressModule } from 'src/address/address.module';
import { ActivitiesModule } from 'src/activities/activities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Space]),
    FilesModule,
    AddressModule,
    ActivitiesModule,
  ],
  controllers: [SpaceController],
  providers: [SpaceService],
  exports: [SpaceService],
})
export class SpaceModule {}
