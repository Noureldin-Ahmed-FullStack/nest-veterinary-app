import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
// import { HttpExceptionFilter } from './filters/http-exception.filter';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
// import { redisClient } from './redis/redis.client';
import { MetricsInterceptor } from './metrics/metrics.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  // await redisClient.connect(); // connect once globally
  // const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  // app.useGlobalFilters(new PrismaExceptionFilter());
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new MetricsInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
   const config = new DocumentBuilder()
    .setTitle('Veterinary API Documentation')
    .setDescription('this application is for veterinary clinic management, allows users to book appointments, manage pet records, and access veterinary services.')
    .setVersion('1.0')
    .addTag('veterinary')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
