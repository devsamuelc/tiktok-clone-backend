import { VideoLikeEntity } from '@/types/video-like';
import { ApiProperty } from '@nestjs/swagger';

export class VideoLikeResponse implements VideoLikeEntity {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  createdAt: Date;

  @ApiProperty({ type: String })
  updatedAt: Date;

  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: String })
  videoId: string;

  @ApiProperty({ type: String, nullable: true })
  deletedAt: Date | null;
}
