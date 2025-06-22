import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Authentication } from '../auth/decorators/auth.decorator';
import { IAuthentication } from '../auth/authentication';
import { CommentsEndpointService } from './comments-endpoint.service';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentResponseDto } from './dto/comment-response.dto';
import { CommentPaginatedResponseDto } from './dto/comment-paginated-response.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsEndpointService: CommentsEndpointService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Criar comentário' })
  @ApiParam({ name: 'userId', type: String })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ type: CommentResponseDto })
  @Post('/')
  async createComment(
    @Authentication() authentication: IAuthentication,
    @Body() body: CreateCommentDto,
  ) {
    const { authUserId } = authentication;

    return this.commentsEndpointService.createComment({
      userId: authUserId,
      videoId: body.videoId,
      content: body.content,
    });
  }

  @Get('/video/:videoId')
  @ApiOperation({ summary: 'Listar comentários de um vídeo' })
  @ApiParam({ name: 'videoId', type: String })
  @ApiQuery({ name: 'page', default: '1' })
  @ApiQuery({ name: 'limit', default: '10' })
  @ApiResponse({ type: CommentPaginatedResponseDto })
  async listComments(
    @Param('videoId') videoId: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    return this.commentsEndpointService.listComments({
      videoId,
      page: parsedPage,
      limit: parsedLimit,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Deletar comentário' })
  @ApiResponse({ type: CommentPaginatedResponseDto })
  @Delete('/:commentId')
  @ApiParam({ name: 'commentId', type: String })
  async deleteComment(
    @Authentication() authentication: IAuthentication,
    @Param('commentId') commentId: string,
  ) {
    const { authUserId } = authentication;

    return this.commentsEndpointService.deleteComment({
      commentId,
      userId: authUserId,
    });
  }
}
