// import { CostEstimation } from "./costestimation.entity";
import { EntityRepository,Repository } from "typeorm";
import { SpResponse } from "./spresponse.entity";
// import { CreateCostEstimationDto } from "./dto/costestimation.dto";
// import { CostEstimationStatus } from "./costestimation.enum";
// import { User } from "src/auth/user.entity";

@EntityRepository(SpResponse)
export class SpResponseRepository extends Repository<SpResponse> {
// async createCostEstimation(createCostEstimationDto: CreateCostEstimationDto,user:User): Promise<CostEstimation>{
//     const {description , date} = createCostEstimationDto;
//     const costEstimation = new CostEstimation();
//     costEstimation.description=description;
//     costEstimation.date=date;
//     costEstimation.status= CostEstimationStatus.NOTRESERVED;
//     costEstimation.user=user;
//         await this.save(costEstimation);
//         delete costEstimation.user
//         return costEstimation
// }
}