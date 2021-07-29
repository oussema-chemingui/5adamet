import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../user.entity';
import { UsersRepository } from '../users.repository';
import { ServiceProviderRepository } from 'src/serviceProvider/serviceProvider.repository';
import { AdminsRepository } from 'src/admin/admins.repository';
import { Admin } from 'src/admin/admin.entity';
import { ServiceProvider } from 'src/serviceProvider/serviceProvider.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
   
    @InjectRepository(ServiceProviderRepository)
    private serviceProviderRepository: ServiceProviderRepository,

    @InjectRepository( AdminsRepository)
    private adminsRepository: AdminsRepository,


    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User|Admin|ServiceProvider> {
    const { email } = payload;

    const user: User = await this.usersRepository.findOne({ email });
    const admin: Admin = await this.adminsRepository.findOne({ email });
    const sp: ServiceProvider = await this.serviceProviderRepository.findOne({ email });

    if (user ) {
      return user;
      
    }else if (admin){
      return admin;
    
    }else if (sp){

         return sp;
    }
        throw new UnauthorizedException();
    
  }
 }
