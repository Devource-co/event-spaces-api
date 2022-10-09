import { Test, TestingModule } from '@nestjs/testing';
import { SpaceScheduleController } from './space-schedule.controller';
import { SpaceScheduleService } from './space-schedule.service';

describe('SpaceScheduleController', () => {
  let controller: SpaceScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpaceScheduleController],
      providers: [SpaceScheduleService],
    }).compile();

    controller = module.get<SpaceScheduleController>(SpaceScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
