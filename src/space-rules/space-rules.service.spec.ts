import { Test, TestingModule } from '@nestjs/testing';
import { SpaceRulesService } from './space-rules.service';

describe('SpaceRulesService', () => {
  let service: SpaceRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceRulesService],
    }).compile();

    service = module.get<SpaceRulesService>(SpaceRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
