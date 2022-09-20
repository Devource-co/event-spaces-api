import { Test, TestingModule } from '@nestjs/testing';
import { SpaceRulesController } from './space-rules.controller';
import { SpaceRulesService } from './space-rules.service';

describe('SpaceRulesController', () => {
  let controller: SpaceRulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpaceRulesController],
      providers: [SpaceRulesService],
    }).compile();

    controller = module.get<SpaceRulesController>(SpaceRulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
