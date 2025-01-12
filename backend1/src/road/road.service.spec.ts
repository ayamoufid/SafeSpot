import { Test, TestingModule } from '@nestjs/testing';
import { RoadService } from './road.service';

describe('RoadService', () => {
  let service: RoadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoadService],
    }).compile();

    service = module.get<RoadService>(RoadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
