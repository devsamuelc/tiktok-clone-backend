import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from '../types/user';
import { UserPermissions } from '@prisma/client';

interface ICreateParams {
  email: string;
  password: string;
  name: string;
}

interface IUpdateParams {
  id: string;
  name?: string;
  email?: string;
  refreshToken?: string | null;
  permission?: UserPermissions;
  password?: string;
}

interface IFindByEmailParams {
  email: string;
}

interface IFindByIdParams {
  id: string;
}

interface ISoftDeleteParams {
  id: string;
}

interface IValidateUserParams {
  email: string;
  pass: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(params: ICreateParams): Promise<UserEntity> {
    const { email, name, password } = params;

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
  }

  async updateUser(params: IUpdateParams): Promise<UserEntity> {
    const { id, ...data } = params;

    const user = await this.findById({
      id,
    });

    if (!user) throw new NotFoundException('User not found');

    const updateData: Partial<typeof user> = { ...data };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async findByEmail(params: IFindByEmailParams): Promise<UserEntity | null> {
    const { email } = params;

    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(params: IFindByIdParams): Promise<UserEntity | null> {
    const { id } = params;

    return this.prisma.user.findUnique({ where: { id } });
  }

  async softDeleteUser(params: ISoftDeleteParams): Promise<void> {
    const { id } = params;

    const user = await this.findById({
      id,
    });

    if (!user) throw new NotFoundException('User not found');

    await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async validateUser(params: IValidateUserParams): Promise<UserEntity | null> {
    const { email, pass } = params;

    const user = await this.findByEmail({
      email,
    });

    if (!user) return null;

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) return null;

    return user;
  }
}
