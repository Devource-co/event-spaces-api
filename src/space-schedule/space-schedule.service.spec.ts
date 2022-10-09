import { Test, TestingModule } from '@nestjs/testing';
import { SpaceScheduleService } from './space-schedule.service';

describe('SpaceScheduleService', () => {
  let service: SpaceScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceScheduleService],
    }).compile();

    service = module.get<SpaceScheduleService>(SpaceScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
