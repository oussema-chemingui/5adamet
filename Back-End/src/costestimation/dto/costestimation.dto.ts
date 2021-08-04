import { IsNotEmpty,IsOptional, IsString } from 'class-validator';

export class CreateCostEstimationDto {
  
  @IsNotEmpty()
  @IsString()
  description:string;

  @IsNotEmpty()
  @IsString()
  date:string;

  @IsNotEmpty()
  @IsString()
  service:string;
  
  @IsNotEmpty()
  @IsString()
  city:string;

  @IsNotEmpty()
  @IsString()
  username:string;

  @IsOptional()
  image ?:string;

 
}