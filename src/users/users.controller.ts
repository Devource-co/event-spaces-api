import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
  Request,
  Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { TransformInterceptor } from 'src/utils/transform.interceptor';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
  @Get('get_profile')
  @UseInterceptors(TransformInterceptor)
  async getProfile(@Request() req) {
    const userId = req.user?.id;
    const user = await this.usersService.findById(userId);
    delete user.password;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('edit_profile')
  @UseInterceptors(TransformInterceptor)
  async editProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user?.id;
    const user = await this.usersService.update(userId, updateUserDto);
    delete user.password;
    return user;
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
