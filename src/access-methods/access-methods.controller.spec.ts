import { Test, TestingModule } from '@nestjs/testing';
import { AccessMethodsController } from './access-methods.controller';
import { AccessMethodsService } from './access-methods.service';

describe('AccessMethodsController', () => {
  let controller: AccessMethodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessMethodsController],
      providers: [AccessMethodsService],
    }).compile();

    controller = module.get<AccessMethodsController>(AccessMethodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
