import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userFind = await this.prisma.user.findUnique({ where: { id } });
    if (!userFind) {
      throw new NotFoundException('usuario no econtrado');
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    const userFind = await this.prisma.user.findUnique({ where: { id } });
    if (!userFind) {
      throw new NotFoundException('usuario no econtrado');
    }
    return this.prisma.user
      .delete({ where: { id } })
      .then(() => `el usuario con el ID ${id} ha sido eliminado con exito`);
  }
}
