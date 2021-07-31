import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CostEstimation } from './costestimation.entity';
import { CostEstimationRepository } from './costestimation.repository';
import { CreateCostEstimationDto } from './dto/costestimation.dto';

@Injectable()
export class CostestimationService {
    constructor (
        @InjectRepository(CostEstimationRepository)
        private costEstimationRepository :CostEstimationRepository,
    ){}

    async getAllDemands(): Promise<CostEstimation[]> {
      return await this.costEstimationRepository.getAllDemands();
    }


    async createCostEstimation (
      createCostEstimationDto: CreateCostEstimationDto,
      user:User
      ): Promise<CostEstimation>{
        return this.costEstimationRepository.createCostEstimation(createCostEstimationDto,user)
    }
}

