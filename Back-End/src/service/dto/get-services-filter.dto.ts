import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class GetServicesFilterDto {
  // name: string;
  // description: string;
  // cost: number;
  // main_service: string;

  @IsOptional()
  @IsString()
  search?: string;
}
