import { Test, TestingModule } from '@nestjs/testing';
import { SpaceImagesController } from './space-images.controller';
import { SpaceImagesService } from './space-images.service';

describe('SpaceImagesController', () => {
  let controller: SpaceImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpaceImagesController],
      providers: [SpaceImagesService],
    }).compile();

    controller = module.get<SpaceImagesController>(SpaceImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
