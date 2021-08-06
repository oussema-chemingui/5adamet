import { Transform } from 'class-transformer';
import { IsNotEmpty,IsNumber,IsOptional, IsPositive, IsString, Max, Min } from 'class-validator';

export class CreateCostAnswerDto {
  
  @IsNotEmpty()
  @IsString()
  description:string;


  @Transform((total) => (Number.isNaN(+total.value) ? 0 : +total.value))
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(5)
  @Max(100000)
  total: number;
  
  @IsNotEmpty()
  @IsString()
  username:string;

  @IsNotEmpty()
  @IsString()
  spname:string;

  @IsNotEmpty()
  @IsString()
  date:string;
 
}