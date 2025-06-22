import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { fastifyMultipart } from '@fastify/multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle('API TikTok Killer')
    .setDescription('API para vídeos, comentários e likes')
    .setVersion('1.0')
    .addBearerAuth() // para JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);

  await app.register(fastifyMultipart);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT, '0.0.0.0');
}

bootstrap();
