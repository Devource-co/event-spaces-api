import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthStaffGuard extends AuthGuard('jwt-staff') {}
