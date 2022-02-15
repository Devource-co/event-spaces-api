import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SocialLoginDto } from './dto/socials-login.dto';
import { TransformInterceptor } from 'src/utils/transform.interceptor';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UseInterceptors(TransformInterceptor)
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('login-facebook')
  @HttpCode(200)
  @UseInterceptors(TransformInterceptor)
  async loginWithFacebook(@Body() socialLoginDto: SocialLoginDto) {
    const socialUser = await this.authService.validateFacebook(socialLoginDto);
    return this.authService.loginSocial({
      email: socialUser.email,
      name: socialUser.name,
      type: 'facebook',
    });
  }

  @Post('login-google')
  @HttpCode(200)
  @UseInterceptors(TransformInterceptor)
  async loginWithGoogle(@Body() socialLoginDto: SocialLoginDto) {
    const socialUser = await this.authService.validateGoogle(socialLoginDto);
    return this.authService.loginSocial({
      email: socialUser.email,
      name: socialUser.name,
      type: 'facebook',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  @UseInterceptors(TransformInterceptor)
  async test() {
    return { message: 'Success!' };
  }
}
