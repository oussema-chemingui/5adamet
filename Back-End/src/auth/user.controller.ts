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

import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './user.entity';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

 
  @Get('getall')
  getUsers( ): Promise<User[]> {
    return this.userService.getAllItems();
  }


  @Get('getuser/:id')
  getService(@Param('id', ParseIntPipe) serviceId) {
    return this.userService.getUser(serviceId);
  }


  @Delete(':id')
  deleteService(@Param('id',ParseIntPipe) id : number): Promise<any> {
    console.log(id)
    return this.userService.deleteUser(id);
  }


}
