import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const checkUser = await this.findByEmail(createUserDto.email);
    if (!checkUser) {
      const user = this.usersRepository.create(createUserDto);
      await user.save();

      delete user.password;
      return user;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'User with this email already exist.',
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  async update(userId, updateDto) {
    const user = this.findById(userId);
    return user;
  }

  async showById(id: string): Promise<User> {
    const user = await this.findById(id);

    delete user.password;
    return user;
  }

  async createUser(userDetails: Partial<User>) {
    const user = this.usersRepository.create(userDetails);
    await user.save();

    delete user.password;
    return user;
  }

  async findById(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}
