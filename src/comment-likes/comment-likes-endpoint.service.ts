import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { CommentLike } from '@prisma/client';

interface ILikeCommentParams {
  userId: string;
  commentId: string;
  videoId: string;
}

interface IUnlikeCommentParams {
  userId: string;
  commentId: string;
}

@Injectable()
export class CommentLikesEndpointService {
  constructor(private readonly commentLikesService: CommentLikesService) {}

  async likeComment(params: ILikeCommentParams): Promise<CommentLike> {
    const { userId, commentId, videoId } = params;

    if (!commentId || !videoId) {
      throw new BadRequestException('commentId and videoId are required.');
    }

    return this.commentLikesService.like({
      commentId,
      userId,
      videoId,
    });
  }

  async unlikeComment(params: IUnlikeCommentParams): Promise<void> {
    const { userId, commentId } = params;

    return this.commentLikesService.unlike({
      commentId,
      userId,
    });
  }
}
