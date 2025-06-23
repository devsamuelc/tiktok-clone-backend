import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { VideoLikesEndpointService } from './video-likes-endpoint.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { Authentication } from '../auth/decorators/auth.decorator';
import { IAuthentication } from '../auth/authentication';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VideoResponseDto } from '@/videos/dto/video-response.dto';

class LikeVideoDto {
  videoId: string;
}

@ApiTags('Video Likes')
@Controller('videos')
export class VideoLikesController {
  constructor(
    private readonly videoLikesEndpointService: VideoLikesEndpointService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Curtir vídeo' })
  @ApiBearerAuth()
  @ApiBody({ type: LikeVideoDto })
  @ApiResponse({ type: VideoResponseDto })
  @Post('/:videoId/like')
  async like(
    @Authentication() authentication: IAuthentication,
    @Param('videoId') videoId: string,
  ) {
    const { authUserId } = authentication;

    return this.videoLikesEndpointService.likeVideo({
      userId: authUserId,
      videoId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Descurtir vídeo' })
  @ApiBearerAuth()
  @Delete('/:videoId')
  async unlike(
    @Authentication() authentication: IAuthentication,
    @Param('videoId') videoId: string,
  ) {
    const { authUserId } = authentication;

    return this.videoLikesEndpointService.unlikeVideo({
      userId: authUserId,
      videoId,
    });
  }
}
