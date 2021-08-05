import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import { AdminsRepository } from '../admin/admins.repository';
import { ServiceProviderRepository } from '../serviceProvider/serviceProvider.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategy/jwt-payload.interface';
import { SignUpDto } from './dto/auth-credentials-signup.dto';
import { User } from './user.entity';

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

  async userSignUp(authCredentialsDto: SignUpDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async adminSignUp(authCredentialsDto: SignUpDto): Promise<void> {
    return this.adminsRepository.createAdmin(authCredentialsDto);
  }

  async SPSignUp(authCredentialsDto: SignUpDto): Promise<void> {
    return this.serviceProviderRepository.createServiceProvider(
      authCredentialsDto,
    );
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;

    const user = await this.usersRepository.findOne({ email });
    const admin = await this.adminsRepository.findOne({ email });
    const sp = await this.serviceProviderRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {
        email: user.email,
        name: user.name,
        role: user.role,
        address: user.address,
        phone: user.phone,
      };

      const accessToken = this.jwtService.sign(payload);
      const userInfo = Object.assign(user, accessToken);

      console.log(userInfo);
      return { accessToken };
    }
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const payload: JwtPayload = {
        email,
        name: admin.name,
        role: admin.role,
        address: admin.address,
        phone: admin.phone,
      };

      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    }
    if (sp && (await bcrypt.compare(password, sp.password))) {
      const payload: JwtPayload = {
        email: sp.email,
        name: sp.name,
        role: sp.role,
        address: sp.address,
        phone: sp.phone,
      };

      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  //   const p1 = new Promise(/* ... */);
  // const p2 = new Promise(/* ... */);
  // const promises = [ p1, p2 ];

  // Promise.any(promises)
  //   .then(firstResult => { /* do whatever */ })
  //   .catch(allErrors => { /* do whatever */ })

  // // or when using async/await

  // try {
  //   const firstResult = await Promise.any(promises);
  //   /* do whatever */
  // } catch (allErrors) {
  //   /* do whatever */
  // }
}
