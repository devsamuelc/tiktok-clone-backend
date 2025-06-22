import { VideoEntity } from '@/types/video';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

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
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: Date })
  updatedAt: Date;

  @Exclude()
  deletedAt: Date | null;
}
