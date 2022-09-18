import { Module } from '@nestjs/common';
import { SpacetypesService } from './spacetypes.service';
import { SpacetypesController } from './spacetypes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceType } from './entities/spacetype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceType])],
  controllers: [SpacetypesController],
  providers: [SpacetypesService],
})
export class SpacetypesModule {}
