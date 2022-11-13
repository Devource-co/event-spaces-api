import { Test, TestingModule } from '@nestjs/testing';
import { BookedDatesController } from './booked-dates.controller';
import { BookedDatesService } from './booked-dates.service';

describe('BookedDatesController', () => {
  let controller: BookedDatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookedDatesController],
      providers: [BookedDatesService],
    }).compile();

    controller = module.get<BookedDatesController>(BookedDatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
