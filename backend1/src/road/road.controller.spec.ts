import { Test, TestingModule } from '@nestjs/testing';
import { RoadController } from './road.controller';

describe('RoadController', () => {
  let controller: RoadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoadController],
    }).compile();

    controller = module.get<RoadController>(RoadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
