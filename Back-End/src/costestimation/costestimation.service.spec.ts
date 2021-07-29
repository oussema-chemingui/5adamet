import { Test, TestingModule } from '@nestjs/testing';
import { CostestimationService } from './costestimation.service';

describe('CostestimationService', () => {
  let service: CostestimationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CostestimationService],
    }).compile();

    service = module.get<CostestimationService>(CostestimationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
