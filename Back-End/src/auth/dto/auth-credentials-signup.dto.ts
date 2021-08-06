import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { AuthCredentialsDto } from './auth-credentials.dto';

export class SignUpDto extends AuthCredentialsDto {



  @IsString()
  @MinLength(5)
  @MaxLength(30)
  name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(40)
  address: string;

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  phone: string;

}
