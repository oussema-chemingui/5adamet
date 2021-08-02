import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController} from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Cart } from './cart.entity';


import { PassportModule } from '@nestjs/passport';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { CartRepository } from './cart.repository';



@Module({
  imports: [
    TypeOrmModule.forFeature([CartRepository ]),
    forwardRef(() => AuthModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CloudinaryModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
