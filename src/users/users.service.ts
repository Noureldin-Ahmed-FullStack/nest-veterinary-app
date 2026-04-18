import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpResponse } from './dto/signUpResponse';
import { LoginUserDto } from './dto/login-user-dto';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  // async registerUser(body: CreateUserDto): Promise<SignUpResponse> {
  //   if (body.password !== body.repassword) {
  //     throw new Error('Passwords do not match');
  //   }
  //   const encryptedPassword = this.encryptPassword(body.password);
  //   return await this.prisma.user.create({
  //     data: {
  //       name: body.name,
  //       email: body.email,
  //       password: await encryptedPassword,
  //     },
  //     select: {
  //       id: true,
  //       email: true,
  //     },
  //   });
  // }
  // async encryptPassword(painPassword: string) {
  //   return await bcrypt.hash(painPassword, 10);
  // }

  // async loginUser(body: LoginUserDto) {
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       email: body.email,
  //     },
  //   });
  //   if (!user) {
  //     throw new Error('Invalid Credentials');
  //   }
  //   const isPasswordValid = await bcrypt.compare(body.password, user.password);
  //   if (!isPasswordValid) {
  //     throw new Error('Invalid Credentials');
  //   }

  //   const payload = { sub: user.id, email: user.email, role: user.role };
  //   return {
  //     message: 'Login successful',
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        description: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: { id: true, name: true, email: true, role: true, description: true },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // if (req.user.sub !== id && req.user.role !== 'ADMIN') {
    //   throw new UnauthorizedException('You are not the owner of this user');
    // }
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    // if (req.user.sub !== id && req.user.role !== 'ADMIN') {
    //   throw new UnauthorizedException('You are not the owner of this user');
    // }
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
