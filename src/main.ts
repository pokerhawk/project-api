import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  app.enableCors({
    // origin: 'http://localhost:5173',
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE, HEAD, PATCH, OPTIONS'],
    credentials: true,
    // allowedHeaders: '*'
  });

  await app.listen(8080)
  .then(() => console.log(`Application is running on port: 8080\napi-key: ${process.env.API_KEY}`));
}
bootstrap();
