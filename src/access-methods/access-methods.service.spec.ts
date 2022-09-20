import { Test, TestingModule } from '@nestjs/testing';
import { AccessMethodsService } from './access-methods.service';

describe('AccessMethodsService', () => {
  let service: AccessMethodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessMethodsService],
    }).compile();

    service = module.get<AccessMethodsService>(AccessMethodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
