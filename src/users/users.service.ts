import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const checkUser = await this.findByEmail(createUserDto.email);
    if (!checkUser) {
      const user = User.create(createUserDto);
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

  async showById(id: string): Promise<User> {
    const user = await this.findById(id);

    delete user.password;
    return user;
  }

  async createUser(userDetails: Partial<User>) {
    const user = User.create(userDetails);
    await user.save();

    delete user.password;
    return user;
  }

  async findById(id: string) {
    return await User.findOne(id);
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }
}
