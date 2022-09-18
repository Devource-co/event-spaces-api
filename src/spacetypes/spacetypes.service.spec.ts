import { Test, TestingModule } from '@nestjs/testing';
import { SpacetypesService } from './spacetypes.service';

describe('SpacetypesService', () => {
  let service: SpacetypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpacetypesService],
    }).compile();

    service = module.get<SpacetypesService>(SpacetypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
