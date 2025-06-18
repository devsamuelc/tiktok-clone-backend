import { Module } from '@nestjs/common';

import { UsersExamModule } from '@/users/exam/users-exam.module';

import { UsersEndpointService } from './users-endpoint.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [UsersExamModule],
  providers: [UsersService, UsersEndpointService],
  controllers: [UsersController],
})
export class UsersModule {}
