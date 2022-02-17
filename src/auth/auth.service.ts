import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom, map } from 'rxjs';
import { OAuth2Client } from 'google-auth-library';

import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { SocialLoginDto } from './dto/socials-login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private async _signJwt(id: string) {
    const payload = {
      userId: id,
    };
    return this.jwtService.sign(payload);
  }

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);
    return {
      access_token: await this._signJwt(user.id),
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { email, password } = authLoginDto;

    const user = await this.usersService.findByEmail(email);
    if (!(await user?.validatePassword(password))) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Please check your email or password and try again',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  async loginSocial(userDetails: {
    email: string;
    name: string;
    type: 'facebook' | 'google';
    picture?: string;
  }) {
    const user = await this.usersService.findByEmail(userDetails.email);
    if (user) {
      return {
        access_token: await this._signJwt(user.id),
        register: false,
      };
    } else {
      const usr = await this.usersService.createUser({
        email: userDetails.email,
        firstname: userDetails.name?.split(' ')?.[0] || '',
        lastname: userDetails.name?.split(' ')?.[1] || '',
        connectedToFacebook: userDetails.type === 'facebook',
        connectedToGoogle: userDetails.type === 'google',
      });

      return {
        access_token: await this._signJwt(usr.id),
        register: true,
      };
    }
  }

  async validateFacebook(socialToken: SocialLoginDto): Promise<{
    name: string;
    email: string;
  }> {
    try {
      const requestConfig = {
        params: {
          input_token: socialToken.accessToken,
          fields: 'id,name,email',
          access_token: socialToken.accessToken,
          grant_type: 'client_credentials',
        },
      };
      const responseData = await lastValueFrom(
        this.httpService
          .get('https://graph.facebook.com/me', requestConfig)
          .pipe(
            map((response) => {
              return response.data;
            }),
          ),
      );
      if (!responseData.email) throw new Error('');
      return responseData;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error:
            'Unable to sign you up via Facebook, kindly use another method',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateGoogle(socialToken: SocialLoginDto) {
    try {
      const client = new OAuth2Client(
        '22752663344-pten3is5r0queuloc6ni34o5udal3o7a.apps.googleusercontent.com',
      );
      const ticket = await client.verifyIdToken({
        idToken: socialToken.accessToken,
        audience:
          '22752663344-pten3is5r0queuloc6ni34o5udal3o7a.apps.googleusercontent.com',
      });
      if (!ticket.getPayload().email) throw new Error('');
      return ticket.getPayload();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to sign you up via Google, kindly use another method',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateUserToken({ userId: id }) {
    const user = await this.usersService.findById(id);
    if (!user.email) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'not authorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  public async getUserFromAuthenticationToken(token: string) {
    const payload: { userId: string } = this.jwtService.verify(token, {
      secret: this.configService.get('secret'),
    });
    if (payload.userId) {
      return this.usersService.findById(payload.userId);
    }
  }
}
