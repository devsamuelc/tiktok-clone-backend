import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

interface ICreateUserParams {
  email: string;
  password: string;
  name: string;
}

interface IFindByEmailParams {
  email: string;
}

interface IFindByIdParams {
  id: string;
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

  async findByEmail(params: IFindByEmailParams) {
    const { email } = params;

    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(params: IFindByIdParams) {
    const { id } = params;
    return this.prisma.user.findUnique({ where: { id } });
  }

  async validateUser(email: string, pass: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) return null;

    return user;
  }
}
