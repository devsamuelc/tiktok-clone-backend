/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenUtils } from '@/utils/Token.utils';
import { IAuthentication } from '../authentication';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  public constructor(private readonly jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    const authHeader = (request.headers['authorization'] ||
      request.headers['Authorization']) as string | undefined;

    const token = TokenUtils.extractBearerToken(authHeader);

    if (!token) {
      throw new UnauthorizedException('No token provided.');
    }

    try {
      const payload = this.jwtService.decode(token) as IAuthentication;

      payload.userId = payload.sub!;

      request['auth'] = payload;
    } catch (error) {
      console.log(error);

      throw new UnauthorizedException('JWT expired.');
    }

    return true;
  }
}
