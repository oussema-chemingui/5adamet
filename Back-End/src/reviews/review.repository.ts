import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateReviewDto } from "./dto/create-review.dto";

import { Review } from "./review.entity";


@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {

    async getAllItems(): Promise<Review[]>{


        const query = this.createQueryBuilder('review')

        try {
            const reviews = await query.getMany()
            return reviews;
          } catch (error) {
            console.error(error);
          }
       
    }



    async createReview(
        createReviewDto : CreateReviewDto,
        ) : Promise<Review> {
        const {  sp_name ,rating,date  , feedback , username,city ,contact} = createReviewDto;
        
        const review = this.create({
          username,
          sp_name,
          rating,
          date,
          feedback,
          city,
          contact,
        });
        
      await this.save(review);
    return review;

    }






}