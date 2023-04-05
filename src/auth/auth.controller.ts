import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SocialLoginDto } from './dto/socials-login.dto';
import { PasswordChangeDto } from './dto/password-update.dto';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() authLoginDto: AuthLoginDto, @Request() req) {
    const ip =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    console.log(ip);
    return this.authService.login(authLoginDto);
  }

  @Post('login-facebook')
  @HttpCode(200)
  async loginWithFacebook(@Body() socialLoginDto: SocialLoginDto) {
    console.log(socialLoginDto);
    const socialUser = await this.authService.validateFacebook(socialLoginDto);
    return this.authService.loginSocial({
      email: socialUser.email,
      name: socialUser.name,
      type: 'facebook',
    });
  }

  @Post('login-google')
  @HttpCode(200)
  async loginWithGoogle(@Body() socialLoginDto: SocialLoginDto) {
    const socialUser = await this.authService.validateGoogle(socialLoginDto);
    return this.authService.loginSocial({
      email: socialUser.email,
      name: socialUser.name,
      type: 'google',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password-change')
  @HttpCode(200)
  async passwordChange(
    @Request() req,
    @Body() passwordChangeDto: PasswordChangeDto,
  ) {
    const userId = req?.user?.id;
    return this.authService.updatePassword(passwordChangeDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  async test(@Request() req) {
    console.log('----->', req.user);
    return { message: 'Success!' };
  }
}
