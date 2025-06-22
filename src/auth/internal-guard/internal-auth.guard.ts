import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class InternalAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const secret = req.headers['x-internal-secret'];

    if (secret !== process.env.INTERNAL_SECRET) {
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }
}
