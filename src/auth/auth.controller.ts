import { Controller, Post, Body } from '@nestjs/common';
import { AuthEndpointService } from './auth-endpoint.service';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';

class LoginDto {
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;
}

class RefreshTokenDto {
  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: String })
  refreshToken: string;
}

@ApiTags('Autenticação')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authEndpointService: AuthEndpointService) {}

  @Post('/login')
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto) {
    const { email, password } = body;

    return this.authEndpointService.login({
      email,
      password,
    });
  }

  @Post('/refresh')
  @ApiBody({ type: RefreshTokenDto })
  refresh(@Body() body: RefreshTokenDto) {
    const { refreshToken, userId } = body;

    return this.authEndpointService.refreshToken({
      refreshToken,
      userId,
    });
  }
}
