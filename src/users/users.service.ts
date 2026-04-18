import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpResponse } from './dto/signUpResponse';
import { LoginUserDto } from './dto/login-user-dto';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async registerUser(body: CreateUserDto): Promise<SignUpResponse> {
    const encryptedPassword = this.encryptPassword(body.password);
    if (body.password !== body.repassword) {
      throw new Error('Passwords do not match');
    }
    return await this.prisma.user.create({
      data: {
        ...body,
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
      throw new Error('Invalid Credentials');
    }
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid Credentials');
    }
    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
