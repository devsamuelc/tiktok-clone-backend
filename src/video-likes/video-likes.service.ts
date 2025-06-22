import { PrismaService } from '@/prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { VideoLike } from '@prisma/client';

@Injectable()
export class VideoLikesService {
  constructor(private readonly prisma: PrismaService) {}

  async like(params: { userId: string; videoId: string }): Promise<VideoLike> {
    const existing = await this.prisma.videoLike.findUnique({
      where: {
        userId_videoId: {
          userId: params.userId,
          videoId: params.videoId,
        },
      },
    });

    if (existing) {
      throw new ForbiddenException('Vídeo já curtido.');
    }

    return this.prisma.videoLike.create({
      data: {
        userId: params.userId,
        videoId: params.videoId,
      },
    });
  }

  async unlike(params: { userId: string; videoId: string }): Promise<void> {
    const existing = await this.prisma.videoLike.findUnique({
      where: {
        userId_videoId: {
          userId: params.userId,
          videoId: params.videoId,
        },
      },
    });

    if (!existing) {
      throw new NotFoundException('Like não encontrado.');
    }

    await this.prisma.videoLike.delete({
      where: {
        userId_videoId: {
          userId: params.userId,
          videoId: params.videoId,
        },
      },
    });
  }
}
