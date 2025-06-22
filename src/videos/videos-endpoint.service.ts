import { Injectable } from '@nestjs/common';
import { VideosService } from './videos.service';

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
export class VideosEndpointService {
  constructor(private readonly videosService: VideosService) {}

  async create(params: ICreateParams) {
    const { description, title, url, userId } = params;

    return this.videosService.create({
      description,
      title,
      url,
      userId,
    });
  }

  async findAll(params: IFindAllParams) {
    const { limit, page } = params;

    return this.videosService.findAll({
      limit,
      page,
    });
  }

  async findAllProcessed(params: IFindAllParams) {
    const { limit, page } = params;

    return this.videosService.findAllProcessed({
      limit,
      page,
    });
  }

  async findById(params: IFindByIdParams) {
    const { id } = params;

    return this.videosService.findById({
      id,
    });
  }

  async markAsProcessed(params: IMarkAsProcessedParams) {
    const { id } = params;

    return this.videosService.markAsProcessed({
      id,
    });
  }

  async softDelete(params: ISoftDeleteParams) {
    const { id, userId } = params;

    return this.videosService.softDelete({
      id,
      userId,
    });
  }

  async update(params: IUpdateParams) {
    const { id, userId, description, title, url } = params;

    return this.videosService.update({
      id,
      userId,
      description,
      title,
      url,
    });
  }
}
