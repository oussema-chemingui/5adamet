import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
  Min,
  Max,

} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(20)
  @Max(100000)
  coast: number;

}
