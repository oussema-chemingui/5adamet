import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from 'src/auth/dto/auth-credentials-signup.dto';

@EntityRepository(Admin)
export class AdminsRepository extends Repository<Admin> {
  async createAdmin(authCredentialsDto: SignUpDto): Promise<void> {
    const {name, email, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = this.create({ name,email, password: hashedPassword });

    try {
      await this.save(admin);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
