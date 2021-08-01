import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { NotFoundException } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { User } from 'src/auth/user.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class CartService {
    

constructor(
    @InjectRepository(CartRepository)
    private cartRepository: CartRepository,
    private cloudinary: CloudinaryService,
)
{}


async getAllItems():Promise<Cart[]>{
 return this.cartRepository.getAllItems()
}



async createCartItem(createCartDto:CreateCartItemDto) : Promise<Cart>{
       
return this.cartRepository.createCartItem(createCartDto);
}


async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }


  
}
