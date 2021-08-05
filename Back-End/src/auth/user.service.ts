import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';



@Injectable()
export class UserService {
    

constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  
)
{}

async getAllItems():Promise<User[]>{
 return this.userRepository.getAllItems()
}



async getUser(providerId: number): Promise<User> {
    const provider = await this.userRepository.findOne({
      where: { id: providerId },
    });
    if (!provider) {
      throw new NotFoundException(
        `Product with id: ${providerId} is not found `,
      );
    }
    return provider;
  }


async deleteUser(id: number): Promise<void> {
  try{
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cart Item with ID "${id}" not found`);
    }
  }catch(err){
    console.log(err)
    }
  
 }

}
