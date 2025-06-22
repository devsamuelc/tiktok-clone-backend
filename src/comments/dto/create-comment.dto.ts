import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @ApiProperty({ type: String })
  videoId: string;

  @IsString()
  @ApiProperty({ type: String })
  content: string;
}
