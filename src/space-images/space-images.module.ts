import { Module } from '@nestjs/common';
import { SpaceImagesService } from './space-images.service';
import { SpaceImagesController } from './space-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceImage } from './entities/space-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceImage])],
  controllers: [SpaceImagesController],
  providers: [SpaceImagesService],
})
export class SpaceImagesModule {}
