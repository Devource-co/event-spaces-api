import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
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
      return 'Success';
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

  async update(user, updateDto) {
    if (updateDto.password) {
      delete updateDto.password;
    }

    await this.usersRepository.update(user.id, updateDto);
    return await this.findById(user.id);
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
    return await this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({
      email,
    });
  }

  async updatePassword(password: string, userId) {
    const hashedPassword = await bcrypt.hash(password, 8);
    return this.usersRepository.update(userId, { password: hashedPassword });
  }

  async getUserWithSpaces(userId: string) {
    return this.usersRepository.findOne({
      where: { id: userId },
      relations: {
        space: {
          reviews: {
            reviewer: true,
            space: true,
          },
          address: true,
        },
      },
      select: {
        id: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        space: {
          id: true,
          title: true,
          thumbnail_url: true,
          price: true,
          address: {
            street: true,
            town: true,
          },
          reviews: {
            review: true,
            rating: true,
            reviewer: {
              profile_pic: true,
              firstname: true,
              lastname: true,
            },
            space: {
              title: true,
              thumbnail_url: true,
            },
          },
        },
      },
    });
  }
}
