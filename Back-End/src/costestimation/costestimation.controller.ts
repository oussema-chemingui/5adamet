import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CostEstimation } from './costestimation.entity';
import { CostestimationService } from './costestimation.service';
import { CreateCostEstimationDto } from './dto/costestimation.dto';

@Controller('costestimation')
@UseGuards(AuthGuard())
export class CostestimationController {
    constructor(private costEstimationService:CostestimationService){}

    @Get('costEstimation/:id')
    getCostEstimationById(@Param('id',ParseIntPipe) id: number): Promise<CostEstimation> {
      return this.costEstimationService.getCostEstimationById(id);
    }

    @Post('createquote')
    createCostEstimation(
    @Body() createCostEstimationDto:CreateCostEstimationDto,
    @GetUser() user:User
    ):Promise <CostEstimation> {
    return this.costEstimationService.createCostEstimation(createCostEstimationDto, user);
  }
  
}
