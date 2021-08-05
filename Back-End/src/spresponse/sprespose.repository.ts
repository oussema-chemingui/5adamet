import { CostEstimation } from 'src/costestimation/costestimation.entity';
import { ServiceProvider } from 'src/serviceProvider/serviceProvider.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateSpResponseDto } from './dto/spresponse.dto';
import { SpResponse } from './spresponse.entity';
import { SpResponseStatus } from './spresponse.enum';

@EntityRepository(SpResponse)
export class SpResponseRepository extends Repository<SpResponse> {

  async getSpResponses (costEstimationId:number): Promise <SpResponse[]>{
        
        const query = this.createQueryBuilder('spResponse');
        query.where('spResponse.costEstimationId = :costEstimationId' , {costEstimationId:costEstimationId})
        const spResponses= await query.getMany();
        return spResponses
  }

  async createSpResponse(
    createSpRepository: CreateSpResponseDto,
    serviceProvider: ServiceProvider,
    costEstimationId:number
  ): Promise<SpResponse> {
    const { cost, response, date } = createSpRepository;
    const spResponse = new SpResponse();
    spResponse.cost = cost;
    spResponse.date = date;
    spResponse.response = response;
    spResponse.costEstimationId=costEstimationId
    spResponse.status= SpResponseStatus.NOTBOOKED
    await this.save(spResponse);

    return spResponse;
  }
}

