import { Module, forwardRef } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController} from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Review } from './review.entity';


import { PassportModule } from '@nestjs/passport';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { ReviewRepository } from './review.repository';



@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewRepository ]),
    forwardRef(() => AuthModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),

  ],
  providers: [ReviewService],
  controllers: [ReviewController],
  exports: [ReviewService],
})
export class ReviewModule {}
