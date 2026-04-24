import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AppService } from './app.service';
@Module({
  imports: [
    UsersModule,
    PostsModule,
    PrismaModule,
    AuthModule,
    PetsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
