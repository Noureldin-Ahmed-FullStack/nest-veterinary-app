import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule], // ✅ THIS IS THE FIX
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
