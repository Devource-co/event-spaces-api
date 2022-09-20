import { Module } from '@nestjs/common';
import { AccessMethodsService } from './access-methods.service';
import { AccessMethodsController } from './access-methods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessMethod } from './entities/access-method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessMethod])],
  controllers: [AccessMethodsController],
  providers: [AccessMethodsService],
})
export class AccessMethodsModule {}
