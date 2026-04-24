import { createClient } from 'redis';

export const redisClient = createClient({
  url: process.env.REDIS_HOST, // rediss://default:password@host:port
});