import { Test, TestingModule } from '@nestjs/testing';
import { CostestimationController } from './costestimation.controller';

describe('CostestimationController', () => {
  let controller: CostestimationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CostestimationController],
    }).compile();

    controller = module.get<CostestimationController>(CostestimationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
