import {
  Controller,
  UseGuards,
  Patch,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { VideosEndpointService } from '@/videos/videos-endpoint.service';
import { InternalAuthGuard } from '@/auth/internal-guard/internal-auth.guard';

@Controller('internal/videos')
@UseGuards(InternalAuthGuard)
export class InternalVideosController {
  constructor(private readonly videosEndpointService: VideosEndpointService) {}

  @Patch(':id/process')
  async markAsProcessed(@Param('id') id: string) {
    return this.videosEndpointService.markAsProcessed({
      id,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.videosEndpointService.softDelete({
      id,
      userId: '',
    });
  }
}
