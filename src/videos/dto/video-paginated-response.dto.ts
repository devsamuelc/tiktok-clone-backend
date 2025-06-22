import { ApiProperty } from '@nestjs/swagger';
import { VideoResponseDto } from './video-response.dto';

interface IVideoResponseMetadata {
  total: number;
  page: number;
  limit: number;
  pageCount: number;
}

export class VideoPaginatedResponseDto {
  @ApiProperty({ type: VideoResponseDto, isArray: true })
  data: VideoResponseDto[];

  meta: IVideoResponseMetadata;
}
