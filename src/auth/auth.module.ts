import { Module } from '@nestjs/common';

import { AuthEndpointService } from './auth-endpoint.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    AuthService,
    AuthEndpointService,
    PrismaService,
    UsersService,
    JwtService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
