import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PetsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(id: string, createPetDto: CreatePetDto) {
    return await this.prisma.pet.create({
      data: {
        ...createPetDto,
        ownerId: id,
      },
      select: {
        id: true,
        name: true,
        age: true,
        type: true,
        owner: {select: {id: true, name: true, email: true}},
        breed: true,
        pfp: true,
        dateCreated: true,
        updatedAt: true,
      },
    });
  }

  async findAll() {
    return this.prisma.pet.findMany();
  }

  async findOne(id: string) {
    return this.prisma.pet.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    return this.prisma.pet.update({
      where: {
        id,
      },
      data: updatePetDto,
    });
  }

  async remove(id: string) {
    return this.prisma.pet.delete({
      where: {
        id,
      },
    });
  }
}
