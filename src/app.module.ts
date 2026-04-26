import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AppService } from './app.service';
import { MetricsService } from './metrics/metrics.service';
import { MetricsController } from './metrics/metrics.controller';
import { MetricsModule } from './metrics/metrics.module';
@Module({
  imports: [
    UsersModule,
    PostsModule,
    PrismaModule,
    AuthModule,
    PetsModule,
    MetricsModule,
  ],
  controllers: [AppController, MetricsController],
  providers: [AppService, PrismaService, MetricsService],
})
export class AppModule {}
