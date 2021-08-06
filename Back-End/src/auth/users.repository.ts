import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/auth-credentials-signup.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  
  async getAllItems(): Promise<User[]>{


    const query = this.createQueryBuilder('user')

    try {
        const Users = await query.getMany()
        return Users;
      } catch (error) {
        console.error(error);
      }
   
}



  async createUser(authCredentialsDto: SignUpDto): Promise<void> {
    const {name, email, password ,phone , address } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({name, email, password: hashedPassword ,phone , address});

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        console.log(error)
        throw new InternalServerErrorException();
      }
    }
  }
}
