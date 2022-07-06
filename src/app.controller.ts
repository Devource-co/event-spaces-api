import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from './utils/transform.interceptor';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return { message: 'Hello FindySpace!' };
  }
}
