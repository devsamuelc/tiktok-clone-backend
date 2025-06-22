import { Module } from '@nestjs/common';

import { VideosEndpointService } from './videos-endpoint.service';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { PrismaService } from '@/prisma/prisma.service';
import { EventService } from '@/events/event.service';
import { JwtService } from '@nestjs/jwt';
import { S3Service } from '@/s3/s3.service';

@Module({
  providers: [
    VideosService,
    VideosEndpointService,
    PrismaService,
    EventService,
    JwtService,
    S3Service,
  ],
  controllers: [VideosController],
})
export class VideosModule {}
