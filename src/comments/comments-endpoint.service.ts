import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from '@prisma/client';

interface ICreateCommentParams {
  userId: string;
  videoId: string;
  content: string;
}

interface IListCommentsParams {
  videoId: string;
  page?: number;
  limit?: number;
}

interface IDeleteCommentParams {
  commentId: string;
  userId: string;
}

@Injectable()
export class CommentsEndpointService {
  constructor(private readonly commentsService: CommentsService) {}

  async createComment(params: ICreateCommentParams): Promise<Comment> {
    const { userId, videoId, content } = params;

    if (!content.trim()) {
      throw new BadRequestException('Comentário não pode ser vazio.');
    }

    return this.commentsService.create({
      userId,
      videoId,
      content,
    });
  }

  async listComments(params: IListCommentsParams) {
    const { videoId, page, limit } = params;

    return this.commentsService.findByVideoId({
      videoId,
      page,
      limit,
    });
  }

  async deleteComment(params: IDeleteCommentParams): Promise<Comment> {
    const { commentId, userId } = params;

    const comment = await this.commentsService.softDelete({
      commentId,
      userId,
    });

    if (!comment) {
      throw new NotFoundException('Comentário não encontrado ou já deletado.');
    }

    return comment;
  }
}
