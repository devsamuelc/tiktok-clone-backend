import { PrismaService } from '@/prisma/prisma.service';
import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CommentLike } from '@prisma/client';

@Injectable()
export class CommentLikesService {
  constructor(private readonly prisma: PrismaService) {}

  async like(params: {
    userId: string;
    commentId: string;
    videoId: string;
  }): Promise<CommentLike> {
    const { userId, commentId, videoId } = params;

    const existing = await this.prisma.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });

    if (existing) {
      throw new ForbiddenException('Comentário já curtido.');
    }

    return this.prisma.commentLike.create({
      data: {
        userId,
        commentId,
        videoId,
      },
    });
  }

  async unlike(params: { userId: string; commentId: string }): Promise<void> {
    const existing = await this.prisma.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId: params.userId,
          commentId: params.commentId,
        },
      },
    });

    if (!existing) {
      throw new NotFoundException('Like não encontrado.');
    }

    await this.prisma.commentLike.delete({
      where: {
        userId_commentId: {
          userId: params.userId,
          commentId: params.commentId,
        },
      },
    });
  }
}
