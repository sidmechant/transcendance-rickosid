import { Test, TestingModule } from '@nestjs/testing';
import { PhysicService } from './physic.service';

describe('PhysicService', () => {
  let service: PhysicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicService],
    }).compile();

    service = module.get<PhysicService>(PhysicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
