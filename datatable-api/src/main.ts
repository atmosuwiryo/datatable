/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { swaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const globalPrefix = '';
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
  if (process.env.NODE_ENV !== 'production') {
    Logger.log(`Swagger is running on ${config.get('SWAGGER_PATH')}`)
    SwaggerModule.setup(config.get('SWAGGER_PATH'), app, document);
  }

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
