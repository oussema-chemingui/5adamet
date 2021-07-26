import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  getCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getCategory(id);
  }

  @UseGuards(AuthGuard())
  @Post(':id/services')
  @UseInterceptors(
    FileInterceptor('image')
  )


  createService(
    @Param('id', ParseIntPipe) categoryId: number,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('coast') coast: number,
    @UploadedFile() image,
  ) {
    return this.categoryService.createService(
      categoryId,
      name,
      description,
      coast,
      image
    );
  }

  @UseGuards(AuthGuard())
  @Put(':id/services/:serviceId')
  @UseInterceptors(
    FileInterceptor('image')
  )


  updateService(
    @Param('id', ParseIntPipe) categoryId: number,
    @Param('serviceId', ParseIntPipe) serviceId: number,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('coast') coast: number,
    @UploadedFile() image,
  ) {
    return this.categoryService.updateService(
      categoryId,
      serviceId,
      name,
      description,
      coast,
      image,
    );
  }
  @UseGuards(AuthGuard())
  @Delete(':id/services/:serviceId')
  deleteService(
    @Param('id', ParseIntPipe) categoryId: number,
    @Param('serviceId', ParseIntPipe) serviceId: number,
  ) {
    return this.categoryService.deleteService(
      categoryId,
      serviceId,
    );
  }

  @Get(':id/services')
  getServices(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getServices(id);
  }

  @UseGuards(AuthGuard())
  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @UseGuards(AuthGuard())
  @Put(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
