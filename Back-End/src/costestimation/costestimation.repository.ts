import { CostEstimation } from "./costestimation.entity";
import { EntityRepository,Repository } from "typeorm";
import { CreateCostEstimationDto } from "./dto/costestimation.dto";
import { CostEstimationStatus } from "./costestimation.enum";

@EntityRepository(CostEstimation)
export class CostEstimationRepository extends Repository<CostEstimation> {
async createCostEstimation(createCostEstimationDto: CreateCostEstimationDto): Promise<CostEstimation>{
    const {description , date} = createCostEstimationDto;
    const costEstimation = new CostEstimation();
    costEstimation.description=description;
    costEstimation.date=date;
    costEstimation.status= CostEstimationStatus.NOTRESERVED;
    //  await costEstimation.save();
    return costEstimation
}
}