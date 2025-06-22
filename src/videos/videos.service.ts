import { BadRequestException, Injectable } from '@nestjs/common';
import { EventService } from '../events/event.service';
import { PrismaService } from '@/prisma/prisma.service';
import { VideoEntity } from '@/types/video';

interface ICreateParams {
  userId: string;
  title: string;
  description: string;
  url: string;
}

interface IFindByIdParams {
  id: string;
}

interface IFindAllParams {
  page?: number;
  limit?: number;
}

interface ISoftDeleteParams {
  id: string;
  userId: string;
}

interface IUpdateParams {
  id: string;
  userId: string;
  title?: string;
  description?: string;
  url?: string;
}

interface IMarkAsProcessedParams {
  id: string;
}

@Injectable()
export class VideosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventService: EventService,
  ) {}

  async create(params: ICreateParams): Promise<VideoEntity> {
    const { url } = params;

    const videoId = url.split('/')[url.split('/').length - 1].split('.')[0];

    if (!videoId)
      throw new BadRequestException('ID do vídeo não encontrado na URL.');

    const video = await this.prisma.video.create({
      data: {
        ...params,
        id: videoId,
        processedAt: null,
      },
    });

    await this.eventService.publish('video.created', {
      videoId,
      userId: video.userId,
      url: video.url,
    });

    return video;
  }

  async findAllProcessed(params: IFindAllParams) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const where = {
      deletedAt: null,
      processedAt: { not: null },
    };

    const [videos, total] = await this.prisma.$transaction([
      this.prisma.video.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      this.prisma.video.count({ where }),
    ]);

    return {
      data: videos,
      meta: {
        total,
        page,
        limit,
        pageCount: Math.ceil(total / limit),
      },
    };
  }

  async findAll(params: IFindAllParams) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const where = {
      deletedAt: null,
    };

    const [videos, total] = await this.prisma.$transaction([
      this.prisma.video.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      this.prisma.video.count({ where }),
    ]);

    return {
      data: videos,
      meta: {
        total,
        page,
        limit,
        pageCount: Math.ceil(total / limit),
      },
    };
  }

  async findById(params: IFindByIdParams): Promise<VideoEntity | null> {
    const { id } = params;

    return this.prisma.video.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async markAsProcessed(params: IMarkAsProcessedParams): Promise<VideoEntity> {
    const { id } = params;

    return this.prisma.video.update({
      where: { id },
      data: {
        processedAt: new Date(),
      },
    });
  }

  async softDelete(params: ISoftDeleteParams): Promise<VideoEntity> {
    const { id, userId } = params;

    return this.prisma.video.update({
      where: { id, userId },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async update(params: IUpdateParams): Promise<VideoEntity> {
    const { userId, id, ...data } = params;

    return this.prisma.video.update({
      where: { id, userId },
      data,
    });
  }
}
