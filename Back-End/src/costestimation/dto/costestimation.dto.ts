import { IsNotEmpty,IsOptional } from 'class-validator';

export class CreateCostEstimationDto {
  
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  date: Date;

}