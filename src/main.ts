import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
// import { HttpExceptionFilter } from './filters/http-exception.filter';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  // app.useGlobalFilters(new PrismaExceptionFilter());
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
