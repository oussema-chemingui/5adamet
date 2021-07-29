import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/auth-credentials-signup.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('users/signup')
  userSignUp(@Body() authCredentialsDto: SignUpDto): Promise<void> {
    return this.authService.userSignUp(authCredentialsDto);
  }

  @Post('admins/signup')
  adminSignUp(@Body() authCredentialsDto: SignUpDto): Promise<void> {
    return this.authService.adminSignUp(authCredentialsDto);
  }

  @Post('serviceprovider/signup')
  SPSignUp(@Body() authCredentialsDto: SignUpDto): Promise<void> {
    return this.authService.SPSignUp(authCredentialsDto);
  }



  @Post('signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
