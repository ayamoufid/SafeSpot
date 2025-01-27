import { Test, TestingModule } from '@nestjs/testing';
import { SafespotService } from './safespot.service';

describe('SafespotService', () => {
  let service: SafespotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SafespotService],
    }).compile();

    service = module.get<SafespotService>(SafespotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
