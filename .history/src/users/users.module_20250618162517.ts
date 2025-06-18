import { Module } from '@nestjs/common';

import { UsersEndpointService } from './users-endpoint.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  providers: [UsersService, UsersEndpointService],
  controllers: [UsersController],
})
export class UsersModule {}
