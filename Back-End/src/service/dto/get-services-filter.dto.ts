import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetServicesFilterDto {
  name: string;
  description: string;
  coast: number;
  main_service: string;
}
