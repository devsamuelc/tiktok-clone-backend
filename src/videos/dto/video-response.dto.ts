import { VideoEntity } from '@/types/video';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

class UserResponseDto {
  @ApiProperty({ example: '4945c1c4-2928-4f80-8c84-d9c44f4ef34a' })
  id: string;

  @ApiProperty({ example: 'Samuel Lima' })
  name: string;
}

export class CommentResponseDto {
  @ApiProperty({ type: String })
  content: string;

  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;
}

export class VideoResponseDto implements VideoEntity {
  @Expose()
  @ApiProperty({ type: String })
  id: string;

  @Expose()
  @ApiProperty({ type: String })
  title: string;

  @Expose()
  @ApiProperty({ type: String, nullable: true })
  description: string | null;

  @Expose()
  @ApiProperty({ type: String })
  url: string;

  @Expose()
  @ApiProperty({ type: String })
  status: $Enums.VideoStatus;

  @Expose()
  @ApiProperty({ type: Date })
  processedAt: Date | null;

  @Expose()
  @ApiProperty({ type: String })
  userId: string;

  @Expose()
  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;

  @Expose()
  @ApiProperty({ type: CommentResponseDto })
  comments: CommentResponseDto[];

  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: Date })
  updatedAt: Date;

  @Exclude()
  deletedAt: Date | null;

  @Expose()
  @ApiProperty({ type: Number })
  likeCount: number;
}
