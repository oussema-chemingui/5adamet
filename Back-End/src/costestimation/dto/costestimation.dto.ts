import { IsNotEmpty,IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  providers: number;

  @IsOptional()
  comment: string
}