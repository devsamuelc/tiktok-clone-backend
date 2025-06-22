import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { Authentication } from '../auth/decorators/auth.decorator';
import { IAuthentication } from '../auth/authentication';
import { CommentLikesEndpointService } from './comment-likes-endpoint.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CommentLikeResponseDto } from './dto/comment-like.response.dto';

class LikeCommentDto {
  commentId: string;
  videoId: string;
}

@ApiTags('Comment Likes')
@Controller('comment-likes')
export class CommentLikesController {
  constructor(
    private readonly commentLikesEndpointService: CommentLikesEndpointService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Curtir comentário' })
  @ApiResponse({ type: CommentLikeResponseDto })
  @ApiBearerAuth()
  @Post('/')
  async like(
    @Authentication() authentication: IAuthentication,
    @Body() body: LikeCommentDto,
  ) {
    const { authUserId } = authentication;

    return this.commentLikesEndpointService.likeComment({
      userId: authUserId,
      commentId: body.commentId,
      videoId: body.videoId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Descurtir comentário' })
  @ApiBearerAuth()
  @Delete('/:commentId')
  async unlike(
    @Authentication() authentication: IAuthentication,
    @Param('commentId') commentId: string,
  ) {
    const { authUserId } = authentication;

    return this.commentLikesEndpointService.unlikeComment({
      userId: authUserId,
      commentId,
    });
  }
}
