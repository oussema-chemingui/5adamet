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

    async getCostEstimationById(id: number): Promise<CostEstimation> {
        const found = await this.costEstimationRepository.findOne(id);
    
        if (!found) {
          throw new NotFoundException(`CostEstimation with ID "${id}" not found`);
        }
    
        return found;
      }

    async createCostEstimation (
      createCostEstimationDto: CreateCostEstimationDto,
      user:User
      ): Promise<CostEstimation>{
        return this.costEstimationRepository.createCostEstimation(createCostEstimationDto,user)
    }
}

