import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { redisClient } from '../redis/redis.client';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import type { Cache } from 'cache-manager';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly redisService: RedisService,
  ) {}
  async create(userId: string, createPostDto: CreatePostDto) {
    return await this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        authorId: userId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        authorId: true,
        dateCreated: true,
        updatedAt: true,
      },
    });
  }
  async findAll() {
    const cached = await redisClient.get('products');

    if (cached) {
      console.log('Returning from cache');
      return { cached: true, products: JSON.parse(cached) };
    }
    const products = await this.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        authorId: true,
        dateCreated: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
    await redisClient.set('products', JSON.stringify(products), {
      EX: 60, // cache for 60 seconds
    });
    console.log('Returning from database');
    return { cached: false, products };
  }

  async findOne(id: string) {
    return await this.prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        authorId: true,
        dateCreated: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: {
        id,
      },
      data: updatePostDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
