import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';
import { CommentsModule } from './comments/comments.module';
import { VideoLikesModule } from './video-likes/video-likes.module';
import { CommentLikesModule } from './comment-likes/comment-likes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    VideosModule,
    CommentsModule,
    VideoLikesModule,
    CommentLikesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
