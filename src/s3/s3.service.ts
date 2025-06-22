/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  private s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  async uploadVideo(videoId: string, buffer: Buffer, contentType: string) {
    const videoName = `videos/${videoId}.mp4`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: videoName,
      Body: buffer,
      ContentType: contentType,
    });

    await this.s3.send(command);

    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${videoName}`;
  }
}
