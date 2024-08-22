/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { swaggerConfig } from './config/swagger.config';
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception.filter';

// eslint-disable-next-line max-lines-per-function
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  // CORS
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = config.get('PORT')|| 3000;

  // Auto validation at the application level
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // PrismaClient Exception Filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // we need to check nx cli task target configuration first,
  // since this will be overridden by env variable inside .env
  // we don't want that
  const node_env: string = process.env.NX_TASK_TARGET_CONFIGURATION ?? process.env.NODE_ENV;
  if (node_env !== 'production') {
    Logger.log(`Swagger is running on ${config.get('SWAGGER_PATH')}`);
    SwaggerModule.setup(config.get('SWAGGER_PATH'), app, document);
  }

  await app.listen(port, '0.0.0.0');
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
