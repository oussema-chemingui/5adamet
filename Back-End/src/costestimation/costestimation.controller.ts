import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CostEstimation } from './costestimation.entity';
import { CostestimationService } from './costestimation.service';
import { CreateCostEstimationDto } from './dto/costestimation.dto';

@Controller('costestimations')
export class CostestimationController {
  constructor(private costEstimationService: CostestimationService) {}

  @Get('getcosts')
  getCostEstimations(
  
  ): Promise<CostEstimation[]> {
    return this.costEstimationService.getCostEstimations();
  }

  @Get('getcosts/:id')
  getCostEstimation(@Param('id', ParseIntPipe) costId) {
    return this.costEstimationService.getCostEstimation(costId);
  }

  @Post('createcost')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileInterceptor('image'))
  createCostEstimation(@UploadedFile() image , @Body() createCostEstimationDto: CreateCostEstimationDto 
 
   ) :Promise<CostEstimation>  {

     return this.costEstimationService.createCostEstimation(createCostEstimationDto,image);

  }

  @Delete('/delete/:id')
  deleteCostEstimation(@Param('id',ParseIntPipe) id : number): Promise<any> {
    console.log(id)
    return this.costEstimationService.deleteCostEstimation(id);
  }


  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.costEstimationService.uploadImageToCloudinary(file);
  }


}
