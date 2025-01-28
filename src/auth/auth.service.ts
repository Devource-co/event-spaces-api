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
import { PasswordChangeDto } from './dto/password-update.dto';
import { StaffService } from '../staff/staff.service';
import { Staff } from '../staff/entities/staff.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private staffService: StaffService,
    private jwtService: JwtService,
    private httpService: HttpService,
    private readonly configService: ConfigService,
    private staffService: StaffService,
  ) {}

  private async _signJwt(id: string, isAdmin?: boolean) {
    const payload = {
      userId: id,
      isAdmin: !!isAdmin,
    };
    return this.jwtService.sign(payload);
  }

  async login(authLoginDto: AuthLoginDto, isAdmin?: boolean) {
    let user;
    if (isAdmin) {
      user = await this.validateStaff(authLoginDto);
    } else {
      user = await this.validateUser(authLoginDto);
    }
    return {
      access_token: await this._signJwt(user.id, isAdmin),
      user,
    };
  }

  async loginStaff(authLoginDto: AuthLoginDto) {
    const user = await this.validateStaff(authLoginDto);
    return {
      access_token: await this._signJwt(user.id),
      user,
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { email, password } = authLoginDto;
    const user = await this.usersService.findByEmail(email);

    if (user.hasPassword && !(await user?.validatePassword(password))) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Please check your email or password and try again',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!user.password) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Please check your email or password and try again',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    delete user.password;
    return user;
  }

  async validateStaff(authLoginDto: AuthLoginDto): Promise<Staff> {
    const { email, password } = authLoginDto;
    const user = await this.staffService.findByEmail(email);
    if (!(await user?.validatePassword(password))) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Please check your email or password and try again',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    delete user.password;
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
      // if (
      //   (userDetails.type === 'facebook' && !user.connectedToFacebook) ||
      //   (userDetails.type === 'google' && !user.connectedToGoogle)
      // ) {
      //   throw new HttpException(
      //     {
      //       status: HttpStatus.UNPROCESSABLE_ENTITY,
      //       error: `${
      //         userDetails.type === 'facebook' ? 'Facebook' : 'Google'
      //       } account not connected to findySpace, kindly login and connect it`,
      //     },
      //     HttpStatus.UNPROCESSABLE_ENTITY,
      //   );
      // }
      delete user.password;
      const jwtSigned = await this._signJwt(user.id);
      return {
        access_token: jwtSigned,
        register: false,
        user,
      };
    } else {
      const usr = await this.usersService.createUser({
        email: userDetails.email,
        firstname: userDetails.name?.split(' ')?.[0] || '',
        lastname: userDetails.name?.split(' ')?.[1] || '',
        connectedToFacebook: userDetails.type === 'facebook',
        connectedToGoogle: userDetails.type === 'google',
        email_verified: true,
      });
      delete usr.password;
      return {
        access_token: await this._signJwt(usr.id),
        register: true,
        user: usr,
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
      console.log(error);
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
        '574167298510-o2d2vhgc7pa7e0dp9kpudfdugaidaevi.apps.googleusercontent.com',
      );
      const ticket = await client.verifyIdToken({
        idToken: socialToken.accessToken,
        audience:
          '574167298510-o2d2vhgc7pa7e0dp9kpudfdugaidaevi.apps.googleusercontent.com',
      });
      if (!ticket.getPayload().email) throw new Error('');
      return ticket.getPayload();
    } catch (error) {
      console.log('----->', error);
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
    if (!user?.email) {
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

  async validateStaffToken({ userId: id }) {
    const staff = await this.staffService.findOne(id);
    if (!staff?.email) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'not authorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return staff;
  }

  public async getUserFromAuthenticationToken(token: string) {
    const payload: { userId: string } = this.jwtService.verify(token, {
      secret: this.configService.get('secret'),
    });
    if (payload.userId) {
      return this.usersService.findById(payload.userId);
    }
  }

  public async updatePassword(
    passwordChangeDto: PasswordChangeDto,
    userId: string,
  ) {
    const { password, oldPassword } = passwordChangeDto;
    const user = await this.usersService.findById(userId);
    if (!(await user?.validatePassword(oldPassword))) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Wrong password current password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.usersService.updatePassword(password, userId);
    return { updated: true };
  }
}
