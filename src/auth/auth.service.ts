/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'node:crypto';

interface ILoginParams {
  email: string;
  password: string;
}

export interface IJwtPayload {
  authUserId: string;
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail({ email });

    if (!user) return null;

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) return null;

    return user;
  }

  async login(params: ILoginParams) {
    const { email, password } = params;

    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const jwtSecret = process.env.JWT_SECRET;

    const payload = { sub: user.id, email: user.email, authUserId: user.id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: jwtSecret,
    });

    const refreshToken = randomBytes(64).toString('hex');

    let hashedRefreshToken: string;

    try {
      hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    } catch (error) {
      throw new Error((error as Error).message);
    }

    await this.usersService.updateUser({
      id: user.id,
      refreshToken: hashedRefreshToken,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findById({ id: userId });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!isMatch) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    return { access_token: accessToken };
  }
}
