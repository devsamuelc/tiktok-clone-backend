/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

interface ICreateUserParams {
  email: string;
  password: string;
  name: string;
}

interface IUpdateUserParams {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

interface IFindByEmailParams {
  email: string;
}

interface IFindByIdParams {
  id: string;
}

interface IValidateUserParams {
  email: string;
  pass: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(params: ICreateUserParams) {
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

  async updateUser(params: IUpdateUserParams) {
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

  async findByEmail(params: IFindByEmailParams) {
    const { email } = params;

    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(params: IFindByIdParams) {
    const { id } = params;

    return this.prisma.user.findUnique({ where: { id } });
  }

  async validateUser(params: IValidateUserParams) {
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
