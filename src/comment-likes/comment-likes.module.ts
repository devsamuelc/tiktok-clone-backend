import { Module } from '@nestjs/common';

import { CommentLikesEndpointService } from './comment-likes-endpoint.service';
import { CommentLikesController } from './comment-likes.controller';
import { CommentLikesService } from './comment-likes.service';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    CommentLikesService,
    CommentLikesEndpointService,
    PrismaService,
    JwtService,
  ],
  controllers: [CommentLikesController],
})
export class CommentLikesModule {}
