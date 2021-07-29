import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetServicesFilterDto {
  name: string;
  description: string;
  img: string;
  coast: number;
}
