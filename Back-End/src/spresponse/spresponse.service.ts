import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CostEstimation } from 'src/costestimation/costestimation.entity';
import { ServiceProvider } from 'src/serviceProvider/serviceProvider.entity';
import { CreateSpResponseDto } from './dto/spresponse.dto';
import { SpResponse } from './spresponse.entity';
import { SpResponseRepository } from './sprespose.repository';

@Injectable()
export class SpresponseService {
    constructor(
        @InjectRepository(SpResponseRepository)
        private spResponseRepository : SpResponseRepository
        
    ){}
    
    getSpResponses(costEstimationId: number ): Promise<SpResponse[]> {
        return this.spResponseRepository.getSpResponses( costEstimationId );
      }

    async createSpResponse (
        createSpResponseDto: CreateSpResponseDto,
        serviceProvider:ServiceProvider,
        costEstimationId:number
        ): Promise<SpResponse>{
          return this.spResponseRepository.createSpResponse(createSpResponseDto,serviceProvider,costEstimationId)
      }
}
