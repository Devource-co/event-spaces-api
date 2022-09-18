import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceController } from './space.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from './entities/space.entity';
import { FilesModule } from '../files/files.module';
import { AddressModule } from '../address/address.module';
import { ActivitiesModule } from '../activities/activities.module';
import { SpaceType } from '../spacetypes/entities/spacetype.entity';
import { SpacetypesModule } from '../spacetypes/spacetypes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Space, SpaceType]),
    FilesModule,
    AddressModule,
    ActivitiesModule,
    SpacetypesModule,
  ],
  controllers: [SpaceController],
  providers: [SpaceService],
  exports: [SpaceService],
})
export class SpaceModule {}
