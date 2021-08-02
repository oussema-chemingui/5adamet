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

import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { Cart } from './cart.entity';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

 
  @Get('getitems')
  getCartItems( ): Promise<Cart[]> {
    return this.cartService.getAllItems();
  }


  @Post('addtocart')
  @UsePipes(new ValidationPipe({ transform: true }))
  //@UseInterceptors(FileInterceptor('image'))
  createService(  @Body() createCartItemDto: CreateCartItemDto ,
 
   ) :Promise<Cart>  {
console.log(createCartItemDto)
     return this.cartService.createCartItem(createCartItemDto );

  }



  @Delete(':id')
  deleteCartItem(@Param('id') id : number): Promise<any> {
    console.log(id)
    return this.cartService.deleteCartItem(id);
  }


  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cartService.uploadImageToCloudinary(file);
  }


}
