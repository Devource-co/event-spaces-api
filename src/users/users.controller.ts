import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-profile')
  async getProfile(@Request() req) {
    const userId = req.user?.id;
    const user = await this.usersService.findById(userId);
    delete user.password;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('edit-profile')
  async editProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const oldUser = req.user;
    const user = await this.usersService.update(oldUser, updateUserDto);
    delete user.password;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('space')
  async getProfileWithSpace(@Request() req) {
    const user = req.user;
    return this.usersService.getUserWithSpaces(user.id);
  }
}
