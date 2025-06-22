import { Module } from '@nestjs/common';

import { VideoLikesEndpointService } from './video-likes-endpoint.service';
import { VideoLikesController } from './video-likes.controller';
import { VideoLikesService } from './video-likes.service';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    VideoLikesService,
    VideoLikesEndpointService,
    PrismaService,
    JwtService,
  ],
  controllers: [VideoLikesController],
})
export class VideoLikesModule {}
