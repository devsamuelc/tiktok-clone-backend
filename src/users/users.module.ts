import { Module } from '@nestjs/common';

import { UsersEndpointService } from './users-endpoint.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UsersService, UsersEndpointService, PrismaService, JwtService],
  controllers: [UsersController],
})
export class UsersModule {}
