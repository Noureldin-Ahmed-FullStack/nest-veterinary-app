import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { redisClient } from '../../redis/redis.client';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }
    // Format: Bearer TOKEN
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      
      const payload = await this.jwtService.verifyAsync(token);

      const sessionKey = `session:${payload.sub}:${payload.jti}`;
      const exists = await redisClient.get(sessionKey);
      if (!exists) {
        throw new UnauthorizedException('Session expired or revoked');
      }
      // console.log(payload);
      
      request.user = payload;

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
