import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { SignUpResponse } from './dto/signUpResponse';
import { LoginUserDto } from './dto/login-user-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { redisClient } from '../redis/redis.client';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async registerUser(body: RegisterUserDto): Promise<SignUpResponse> {
    if (body.password !== body.repassword) {
      throw new Error('Passwords do not match');
    }
    const encryptedPassword = this.encryptPassword(body.password);
    return await this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        description: body.description,
        password: await encryptedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });
  }
  async encryptPassword(painPassword: string) {
    return await bcrypt.hash(painPassword, 10);
  }

  async loginUser(body: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const jti = randomUUID();
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      jti: jti,
    };
    const sessionKey = `session:${user.id}:${jti}`;
    await redisClient.set(sessionKey, 'valid', {
      EX: 60 * 60 * 24,
    });
    return {
      message: 'Login successful',
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async logoutUser(userId: string, jti: string) {
    const sessionKey = `session:${userId}:${jti}`;
    await redisClient.del(sessionKey);
    return {
      message: 'Logout successful',
    };
  }
}
