import { IsNotEmpty,IsOptional } from 'class-validator';

export class CreateSpResponseDto {
  
  @IsNotEmpty()
  response: string;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  cost: number;
  
}