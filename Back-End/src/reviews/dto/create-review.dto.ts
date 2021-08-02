
import { IsNumber, IsNotEmpty, IsString, MinLength, MaxLength, IsPositive, Min, Max, IsOptional } from "class-validator";

export class CreateReviewDto {
   


  
    @IsNotEmpty()
    @IsString()
    sp_name: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    contact: string;
  
    @IsOptional()
    city: string;
   
    
    @IsNotEmpty()
    @IsNumber()
    rating: number;

    @IsNotEmpty()
    @IsString()
    date: string;


    @IsNotEmpty()
    @IsString()
    feedback: string;

}