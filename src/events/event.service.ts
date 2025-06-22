import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

@Injectable()
export class EventService {
  private sqs = new SQSClient({ region: process.env.AWS_REGION });

  async publish<T>(eventType: string, data: T) {
    const command = new SendMessageCommand({
      QueueUrl: process.env.VIDEO_EVENTS_QUEUE_URL,
      MessageBody: JSON.stringify({
        type: eventType,
        data,
      }),
    });

    await this.sqs.send(command);
  }
}
