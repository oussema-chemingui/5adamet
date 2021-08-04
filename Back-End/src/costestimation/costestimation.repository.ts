import { CostEstimation } from './costestimation.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCostEstimationDto } from './dto/costestimation.dto';
import { User } from 'src/auth/user.entity';
import { CostEstimationStatus } from './costestimation.enum';

@EntityRepository(CostEstimation)
export class CostEstimationRepository extends Repository<CostEstimation> {

  async getCostEstimations(): Promise<CostEstimation[]>{

    const query = this.createQueryBuilder('costestimation');
  
    try {
      const costestimation = await query.getMany();
      return costestimation;
    } catch (error) {
      console.error(error);
    }
  }

  async createCostEstimation(createCostEstimationDto: CreateCostEstimationDto): Promise<CostEstimation> {
    const { username, description, city, date ,service,image } = createCostEstimationDto;

    const costestimation = this.create({
      username,
      description,
      city,
      date,
      service,
      image,
      status:CostEstimationStatus.NOTRESERVED,
    });

    await this.save(costestimation);
    return costestimation;
  }
}