import { CostEstimation } from './costestimation.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCostEstimationDto } from './dto/costestimation.dto';
import { CostEstimationStatus } from './costestimation.enum';
import { User } from 'src/auth/user.entity';

@EntityRepository(CostEstimation)
export class CostEstimationRepository extends Repository<CostEstimation> {
  async createCostEstimation(
    createCostEstimationDto: CreateCostEstimationDto,
    user: User,
  ): Promise<CostEstimation> {
    const { description, date } = createCostEstimationDto;
    const costEstimation = new CostEstimation();
    costEstimation.description = description;
    costEstimation.date = date;
    costEstimation.status = CostEstimationStatus.NOTRESERVED;
    costEstimation.user = user;
    costEstimation.spResponse = [];

    await this.save(costEstimation);

    delete costEstimation.user;
    return costEstimation;
  }
}
