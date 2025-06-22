import { Module } from '@nestjs/common';

import { CommentsEndpointService } from './comments-endpoint.service';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    CommentsService,
    CommentsEndpointService,
    PrismaService,
    JwtService,
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}
