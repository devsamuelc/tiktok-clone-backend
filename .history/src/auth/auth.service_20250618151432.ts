import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

export namespace AuthService {
  export interface LoginParams {
    email: string;
    password: string;
  }

  export interface JwtPayload {
    sub: string;
    email: string;
  }
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.validateUser(email, pass);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(user: any) {
    const payload: AuthService.JwtPayload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
