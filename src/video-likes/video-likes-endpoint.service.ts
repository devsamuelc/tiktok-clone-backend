import { BadRequestException, Injectable } from '@nestjs/common';
import { VideoLikesService } from './video-likes.service';
import { VideoLike } from '@prisma/client';

interface ILikeVideoParams {
  userId: string;
  videoId: string;
}

interface IUnlikeVideoParams {
  userId: string;
  videoId: string;
}

@Injectable()
export class VideoLikesEndpointService {
  constructor(private readonly videoLikesService: VideoLikesService) {}

  async likeVideo(params: ILikeVideoParams): Promise<VideoLike> {
    const { userId, videoId } = params;

    if (!videoId) {
      throw new BadRequestException('videoId is required.');
    }

    return this.videoLikesService.like({
      userId,
      videoId,
    });
  }

  async unlikeVideo(params: IUnlikeVideoParams): Promise<void> {
    const { userId, videoId } = params;

    return this.videoLikesService.unlike({
      userId,
      videoId,
    });
  }
}
