/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Post,
  Patch,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
  ForbiddenException,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { plainToInstance } from 'class-transformer';
import { Authentication } from '@/auth/decorators/auth.decorator';
import { IAuthentication } from '@/auth/authentication';
import { VideosEndpointService } from './videos-endpoint.service';
import { JwtAuthGuard } from '@/auth/jwt/jwt.auth.guard';
import { VideoResponseDto } from './dto/video-response.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VideoPaginatedResponseDto } from './dto/video-paginated-response.dto';
import { S3Service } from '@/s3/s3.service';
import { FastifyRequest } from 'fastify';

@ApiTags('Videos')
@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosEndpointService: VideosEndpointService,
    private readonly s3Service: S3Service,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'Listar vídeos' })
  @ApiQuery({ name: 'page', default: '1' })
  @ApiQuery({ name: 'limit', default: '10' })
  @ApiResponse({ type: VideoPaginatedResponseDto })
  async list(@Query('page') page = '1', @Query('limit') limit = '10') {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    const result = await this.videosEndpointService.findAll({
      page: parsedPage,
      limit: parsedLimit,
    });

    return {
      data: result.data.map((video) =>
        plainToInstance(VideoResponseDto, video, {
          excludeExtraneousValues: true,
        }),
      ),
      meta: result.meta,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/processed')
  @ApiOperation({ summary: 'Listar vídeos processados' })
  @ApiQuery({ name: 'page', default: '1' })
  @ApiQuery({ name: 'limit', default: '10' })
  @ApiResponse({ type: VideoPaginatedResponseDto })
  async listProcessed(@Query('page') page = '1', @Query('limit') limit = '10') {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    const result = await this.videosEndpointService.findAllProcessed({
      page: parsedPage,
      limit: parsedLimit,
    });

    return {
      data: result.data.map((video) =>
        plainToInstance(VideoResponseDto, video, {
          excludeExtraneousValues: true,
        }),
      ),
      meta: result.meta,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar vídeo' })
  @ApiBody({ type: CreateVideoDto })
  @ApiResponse({ type: VideoResponseDto })
  @Post('/')
  async create(
    @Authentication() authentication: IAuthentication,
    @Body() body: CreateVideoDto,
  ) {
    const { authUserId } = authentication;

    if (!authUserId) return;

    const video = await this.videosEndpointService.create({
      userId: authUserId,
      title: body.title,
      description: body.description,
      url: body.url,
    });

    return plainToInstance(VideoResponseDto, video, {
      excludeExtraneousValues: true,
    });
  }

  @Post('/:id/upload')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Subir arquivo do vídeo' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Arquivo do vídeo',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async uploadVideo(
    @Authentication() authentication: IAuthentication,
    @Param('id') id: string,
    @Req() req: FastifyRequest,
  ) {
    if (!authentication.authUserId)
      throw new ForbiddenException(
        'Necessário fazer login para subir um vídeo',
      );

    const file = await req.file();

    if (!file || !file.file)
      throw new BadRequestException('Arquivo não encontrado.');

    const chunks: Uint8Array[] = [];

    for await (const chunk of file.file) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    const url = await this.s3Service.uploadVideo(id, buffer, file.mimetype);

    return { url };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar vídeo' })
  @ApiBody({ type: UpdateVideoDto })
  @ApiResponse({ type: VideoResponseDto })
  @ApiParam({ name: 'id', type: String })
  @Patch('/:id')
  async update(
    @Authentication() authentication: IAuthentication,
    @Param('id') id: string,
    @Body() body: UpdateVideoDto,
  ) {
    const { authUserId } = authentication;

    if (!authUserId) return;

    const video = await this.videosEndpointService.update({
      id,
      userId: authUserId,
      ...body,
    });

    return plainToInstance(VideoResponseDto, video, {
      excludeExtraneousValues: true,
    });
  }
}
