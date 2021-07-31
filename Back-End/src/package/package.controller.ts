import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PackageCreateDto } from './dto/package-create.dto';
import { PackageService } from './package.service';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Get('admin/package')
  async all() {
    return this.packageService.find();
  }

  @Post('admin/package')
  async create(@Body() body: PackageCreateDto) {
    return this.packageService.save(body);
  }

  @Put('admin/package/:id')
  async update(@Param('id') id: number, @Body() body: PackageCreateDto) {
    await this.packageService.update(id, body);
    return this.packageService.findOne({ id });
  }

  @Delete('admin/package/:id')
  async delete(@Param('id') id: number) {
    return this.packageService.delete(id);
  }
}
