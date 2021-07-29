import { CostEstimation } from 'src/costestimation/costestimation.entity';
import { ServiceProvider } from 'src/serviceProvider/serviceProvider.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateSpResponseDto } from './dto/spresponse.dto';
import { SpResponse } from './spresponse.entity';

@EntityRepository(SpResponse)
export class SpResponseRepository extends Repository<SpResponse> {

  async getSpResponses (costEstimation:CostEstimation): Promise <SpResponse[]>{
        
        const query = this.createQueryBuilder('spResponse');
        query.where('spResponse.costEstimationId = :costEstimationId' , {costEstimationId:costEstimation.id})
        const spResponses= await query.getMany();
        return spResponses
  }

  async createSpResponse(
    createSpRepository: CreateSpResponseDto,
    serviceProvider: ServiceProvider,
  ): Promise<SpResponse> {
    const { cost, response, date } = createSpRepository;
    const spResponse = new SpResponse();
    spResponse.cost = cost;
    spResponse.date = date;
    spResponse.response = response;
    spResponse.serviceProvider = serviceProvider;
    await this.save(spResponse);
    delete spResponse.serviceProvider;
    return spResponse;
  }
}
