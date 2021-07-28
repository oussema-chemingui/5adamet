import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
  Min,
  Max,
  IsOptional,
  isBase64,

} from 'class-validator';

export class CreateServiceDto {
 constructor (...args){

  
 }

 
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(1000)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(5)
  @Max(100000)
  coast: number;


  @IsNotEmpty()
  @IsString()
  main_service

  
  
  image : string;

  


}
