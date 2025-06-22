import { IEnvConfiguration } from '@/env/env-configuration';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Environment
      NODE_ENV: IEnvConfiguration.TEnvType;
      PORT: string;

      // Authentication
      JWT_SECRET: string;

      // DB
      DATABASE_URL: string;

      VIDEO_EVENTS_QUEUE_URL: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      SUPER_SECRET_VALUE: string;
      AWS_REGION: string;
      AWS_S3_BUCKET_NAME: string;
    }
  }
}
