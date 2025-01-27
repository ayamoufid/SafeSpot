import { Test, TestingModule } from '@nestjs/testing';
import { SafespotController } from './safespot.controller';

describe('SafespotController', () => {
  let controller: SafespotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SafespotController],
    }).compile();

    controller = module.get<SafespotController>(SafespotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
