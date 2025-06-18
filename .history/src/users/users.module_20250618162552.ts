import { Module } from '@nestjs/common';

import { UsersEndpointService } from './users-endpoint.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  imports: [],
  providers: [UsersService, UsersEndpointService, PrismaService],
  controllers: [UsersController],
})
export class UsersModule {}
