import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { type NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  app.setGlobalPrefix('/api');

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  await app.listen(4200);
}
bootstrap();
