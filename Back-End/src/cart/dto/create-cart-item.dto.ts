import { Transform } from "class-transformer";
import { IsNumber, IsNotEmpty, IsString, MinLength, MaxLength, IsPositive, Min, Max, IsOptional } from "class-validator";

export class CreateCartItemDto {
   

  
    @Transform((cost) => (Number.isNaN(+cost.value) ? 0 : +cost.value))
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @Min(5)
    @Max(100000)
    cost: number;
  

    @IsNotEmpty()
    @IsString()
    service_name: string;

    @IsNotEmpty()
    @IsString()
    main_service: string;
  
    @IsOptional()
    image ?:string;
   
    
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsString()
    username: string;
}