import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpResponse } from './dto/signUpResponse';
@Injectable()
export class UsersService {
constructor(private prisma: PrismaService) {}
  async registerUser(body: CreateUserDto): Promise<SignUpResponse> {
    
    const encryptedPassword = this.encryptPassword(body.password);
    return await this.prisma.user.create({
      data: {
        ...body,
        password: await encryptedPassword,
    },
    select: {
      id: true,
      email: true,
    }
    });
    
  }
  async encryptPassword(painPassword: string) {
    return await bcrypt.hash(painPassword, 10);
  }
  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
