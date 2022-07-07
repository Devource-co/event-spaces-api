import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthModuleOptions } from '@nestjs/passport';
import { Industry } from './entities/industry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Industry]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthModuleOptions],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
