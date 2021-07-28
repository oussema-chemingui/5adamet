import { Test, TestingModule } from '@nestjs/testing';
import { SpresponseController } from './spresponse.controller';

describe('SpresponseController', () => {
  let controller: SpresponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpresponseController],
    }).compile();

    controller = module.get<SpresponseController>(SpresponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
