import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('users/signup')
  userSignUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.userSignUp(authCredentialsDto);
  }

  @Post('admins/signup')
  adminSignUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.adminSignUp(authCredentialsDto);
  }

  @Post('serviceProvider/signup')
  SPSignUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.SPSignUp(authCredentialsDto);
  }

  @Post('users/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
