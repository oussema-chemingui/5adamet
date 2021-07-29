import { Test, TestingModule } from '@nestjs/testing';
import { SpresponseService } from './spresponse.service';

describe('SpresponseService', () => {
  let service: SpresponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpresponseService],
    }).compile();

    service = module.get<SpresponseService>(SpresponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
