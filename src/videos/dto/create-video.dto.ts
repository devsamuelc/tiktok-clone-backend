import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoDto {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  url: string;
}
