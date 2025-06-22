import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommentEntity } from '@/types/comment';

interface ICreateParams {
  userId: string;
  videoId: string;
  content: string;
}

interface IFindByVideoIdParams {
  videoId: string;
  page?: number;
  limit?: number;
}

interface ISoftDeleteParams {
  commentId: string;
  userId: string;
}

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: ICreateParams): Promise<CommentEntity> {
    return this.prisma.comment.create({
      data: {
        userId: params.userId,
        videoId: params.videoId,
        content: params.content,
      },
    });
  }

  async findByVideoId(params: IFindByVideoIdParams) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const [comments, total] = await this.prisma.$transaction([
      this.prisma.comment.findMany({
        where: {
          videoId: params.videoId,
          deletedAt: null,
        },
        include: {
          user: true,
          likes: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
        skip,
        take: limit,
      }),
      this.prisma.comment.count({
        where: {
          videoId: params.videoId,
          deletedAt: null,
        },
      }),
    ]);

    return {
      data: comments,
      meta: {
        page,
        limit,
        total,
        pageCount: Math.ceil(total / limit),
      },
    };
  }

  async softDelete(params: ISoftDeleteParams): Promise<CommentEntity> {
    const { commentId, userId } = params;

    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment || comment.deletedAt) {
      throw new NotFoundException('Comentário não encontrado');
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException('Você não pode deletar este comentário');
    }

    return this.prisma.comment.update({
      where: { id: commentId },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
