import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CostEstimation } from './costestimation.entity';
import { CostEstimationRepository } from './costestimation.repository';
import { CreateCostEstimationDto } from './dto/costestimation.dto';

@Injectable()
export class CostestimationService {
  constructor(
    @InjectRepository(CostEstimationRepository)
    private costestimationRepository: CostEstimationRepository,
    private cloudinary: CloudinaryService,
  ) {}




  async getCostEstimations() : Promise<CostEstimation[]>{
    return await this.costestimationRepository.getCostEstimations();

  }

  async getCostEstimation(serviceId: number): Promise<CostEstimation> {
    const service = await this.costestimationRepository.findOne({
      where: { id: serviceId },
    });
    if (!service) {
      throw new NotFoundException(
        `Product with id: ${serviceId} is not found `,
      );
    }
    return service;
  }

  async getCostEstimationBysp(spName: string): Promise<CostEstimation[]> {
    const service = await this.costestimationRepository.find({
      where: { spname: spName },
    });
    if (!service) {
      throw new NotFoundException(
        `Product with this category: ${spName} is not found `,
      );
    }
    return service;
  }

  async createCostEstimation(createCostEstimationDto: CreateCostEstimationDto,image: Express.Multer.File): Promise<CostEstimation> {
    const {url} = await this.uploadImageToCloudinary(image);
    createCostEstimationDto.image=url;
    return this.costestimationRepository.createCostEstimation(createCostEstimationDto);
  }

  async deleteCostEstimation(id: number): Promise<void> {
    const costestimation = await this.getCostEstimation(id);
    const result = await this.costestimationRepository.delete(costestimation);
    if (result.affected === 0) {
      throw new NotFoundException(`Service with id: ${id} is not found `);
    }
  }
 
  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

}

