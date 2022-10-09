import { Test, TestingModule } from '@nestjs/testing';
import { SpaceImagesService } from './space-images.service';

describe('SpaceImagesService', () => {
  let service: SpaceImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceImagesService],
    }).compile();

    service = module.get<SpaceImagesService>(SpaceImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
