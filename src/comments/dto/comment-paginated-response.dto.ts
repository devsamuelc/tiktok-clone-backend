import { ApiProperty } from '@nestjs/swagger';
import { CommentResponseDto } from './comment-response.dto';

interface ICommentResponseMetadata {
  total: number;
  page: number;
  limit: number;
  pageCount: number;
}

export class CommentPaginatedResponseDto {
  @ApiProperty({ type: CommentResponseDto, isArray: true })
  data: CommentResponseDto[];

  meta: ICommentResponseMetadata;
}
