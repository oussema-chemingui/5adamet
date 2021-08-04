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
import { Transform } from 'class-transformer';

export class CreateServiceDto {
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

  @Transform((cost) => (Number.isNaN(+cost.value) ? 0 : +cost.value))
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(5)
  @Max(100000)
  cost: number;

  @IsNotEmpty()
  @IsString()
  main_service: string;

@IsOptional()
image ?:string;

}
