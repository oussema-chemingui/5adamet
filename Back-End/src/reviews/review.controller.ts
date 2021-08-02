import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Post,
  Patch,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
} from '@nestjs/common';

import { ReviewService } from './review.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './review.entity';


@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

 
  @Get('getreviews')
  getReviews( ): Promise<Review[]> {
    return this.reviewService.getAllItems();
  }


  @Post('addtoreview')
  @UsePipes(new ValidationPipe({ transform: true }))
  //@UseInterceptors(FileInterceptor('image'))
  createService(  @Body() createReviewItemDto: CreateReviewDto ,
 
   ) :Promise<Review>  {
console.log(createReviewItemDto)
     return this.reviewService.createReview(createReviewItemDto );

  }



  @Delete(':id')
  deleteReviewItem(@Param('id',ParseIntPipe) id : number): Promise<any> {
    console.log(id)
    return this.reviewService.deleteReview(id);
  }




}
