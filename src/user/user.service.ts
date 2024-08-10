import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';

import { AuthDto } from 'src/auth/dto/auth.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: true,
      },
    });
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: true,
      },
    });
  }

  async getProfile(id: string) {
    const profile = await this.getById(id);

    const { password: _, ...rest } = profile;

    return {
      user: rest,
    };
  }

  async create(dto: AuthDto) {
    return this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password),
        roles: { create: { role: 'User' } },
      },
      include: { roles: true },
    });
  }

  async update(id: string, dto: UserDto) {
    let data = dto;

    if (dto.password) data = { ...dto, password: await hash(dto.password) };

    return this.prisma.user.update({
      where: { id },
      data,
      select: { username: true, email: true },
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
