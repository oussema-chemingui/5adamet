import { CostAnswer } from './costanswer.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCostAnswerDto } from './dto/costanswer.dto';
import { User } from 'src/auth/user.entity';
import { CostAnswerStatus } from './costanswer.enum';


@EntityRepository(CostAnswer)
export class CostAnswerRepository extends Repository<CostAnswer> {

  async getCostAnswers(): Promise<CostAnswer[]>{

    const query = this.createQueryBuilder('costestimation');
  
    try {
      const costestimation = await query.getMany();
      return costestimation;
    } catch (error) {
      console.error(error);
    }
  }

  async createCostAnswer(createCostAnswerDto: CreateCostAnswerDto): Promise<CostAnswer> {
    const { username, description, date ,total,spname } = createCostAnswerDto;

    const costestimation = this.create({
      username,
      description,
      total,
      date,
      spname,
      status:CostAnswerStatus.NOTANSWERED
    });

    await this.save(costestimation);
    return costestimation;
  }
}