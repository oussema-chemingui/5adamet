import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateReviewDto } from './dto/create-review.dto';
import { NotFoundException } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { User } from 'src/auth/user.entity';


@Injectable()
export class ReviewService {
    

constructor(
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository,
  
)
{}


async getAllItems():Promise<Review[]>{
 return this.reviewRepository.getAllItems()
}



async createReview(createReviewDto:CreateReviewDto) : Promise<Review>{
       
return this.reviewRepository.createReview(createReviewDto);
}




  async deleteReview(id): Promise<any> {
    //console.log(id)
    try{
      const result = await this.reviewRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Review Item with ID "${id}" not found`);
      }
    }catch(err){
      console.log(err)
      }
    
  }
  
}
