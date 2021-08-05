import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CostEstimation } from 'src/costestimation/costestimation.entity';

import { GetSP } from 'src/serviceProvider/get-SP.decorator';
import { ServiceProvider } from 'src/serviceProvider/serviceProvider.entity';
import { CreateSpResponseDto } from './dto/spresponse.dto';
import { SpResponse } from './spresponse.entity';
import { SpresponseService } from './spresponse.service';

@Controller('spresponse')
@UseGuards(AuthGuard())
export class SpresponseController {
    constructor(private spResponseService:SpresponseService){}

    @Get('spresponses/:id')
    getSpResponses(@Param('id',ParseIntPipe) costEstimationid:number): Promise<SpResponse[]>{
      return this.spResponseService.getSpResponses(costEstimationid)
    }

    @Post(':id')
    createSpResponse(
    @Body() createSpResponseDto:CreateSpResponseDto,
    @GetSP() serviceProvider:ServiceProvider,
    @Param('id',ParseIntPipe)
    costEstimationId: number
    ):Promise <SpResponse> {
    return this.spResponseService.createSpResponse(createSpResponseDto, serviceProvider,costEstimationId);
  }

}
