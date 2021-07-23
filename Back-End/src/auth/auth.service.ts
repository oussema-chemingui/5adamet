import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import { AdminsRepository } from '../admin/admins.repository';
import { ServiceProviderRepository } from '../serviceProvider/serviceProvider.repostory'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategy/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    
    @InjectRepository(AdminsRepository)
    private adminsRepository: AdminsRepository,
   
    @InjectRepository(ServiceProviderRepository)
    private serviceProviderRepository: ServiceProviderRepository,
    
    private jwtService: JwtService,
  ) {}


  async userSignUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
    
  }

  async adminSignUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.adminsRepository.createAdmin(authCredentialsDto);
    
  }

  async SPSignUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.serviceProviderRepository.createServiceProvider(authCredentialsDto);
    
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
   
    const user = await this.usersRepository.findOne({ email });
    const admin = await this.adminsRepository.findOne({ email });
    const sp = await this.serviceProviderRepository.findOne({ email });



    if (user  && (await bcrypt.compare(password, user.password)) || admin  && (await bcrypt.compare(password, admin.password)) || sp && (await bcrypt.compare(password, sp.password))) {
      const payload: JwtPayload = { email };
      const accessToken =  this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
