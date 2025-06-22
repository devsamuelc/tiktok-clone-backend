import { CommentEntity } from '@/types/comment';
import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto implements CommentEntity {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  content: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  deletedAt: Date | null;

  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: String })
  videoId: string;
}
