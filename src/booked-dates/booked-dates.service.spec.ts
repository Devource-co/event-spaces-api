import { Test, TestingModule } from '@nestjs/testing';
import { BookedDatesService } from './booked-dates.service';

describe('BookedDatesService', () => {
  let service: BookedDatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookedDatesService],
    }).compile();

    service = module.get<BookedDatesService>(BookedDatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
