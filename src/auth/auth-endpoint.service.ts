import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

interface ILoginParams {
  email: string;
  password: string;
}

interface IRefreshTokenParams {
  userId: string;
  refreshToken: string;
}

@Injectable()
export class AuthEndpointService {
  constructor(private readonly authService: AuthService) {}

  async login(params: ILoginParams) {
    const { email, password } = params;

    return this.authService.login({
      email,
      password,
    });
  }

  async refreshToken(params: IRefreshTokenParams) {
    return this.authService.refreshToken(params.userId, params.refreshToken);
  }
}
