import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, User as UserEntity } from '@prisma/client';
import { UserEntity } from '../types/user';

interface ICreateUserParams {
  email: string;
  password: string;
  name: string;
}

interface IUpdateUserParams {
  id: string;
  email?: string;
  password?: string;
  name?: string;
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

@Injectable()
export class UsersEndpointService {
  constructor(private readonly usersService: UsersService) {}

  async createUser(params: ICreateUserParams): Promise<UserEntity> {
    const { email, name, password } = params;

    const userExists = await this.usersService.findByEmail({
      email,
    });

    if (userExists)
      throw new BadRequestException('User email already registered!');

    return this.usersService.createUser({
      email,
      name,
      password,
    });
  }

  async updateUser(params: IUpdateUserParams): Promise<UserEntity> {
    const { id, email, name, password } = params;

    const userExists = await this.usersService.findById({
      id,
    });

    if (userExists) throw new NotFoundException('User not found!');

    return this.usersService.updateUser({
      id,
      email,
      name,
      password,
    });
  }

  async findByEmail(params: IFindByEmailParams): Promise<UserEntity | null> {
    const { email } = params;

    return this.usersService.findByEmail({
      email,
    });
  }

  async findById(params: IFindByIdParams): Promise<UserEntity | null> {
    const { id } = params;

    return this.usersService.findById({
      id,
    });
  }

  async softDeleteUser(params: ISoftDeleteParams): Promise<void> {
    const { id } = params;

    const userExists = await this.usersService.findById({
      id,
    });

    if (!userExists || userExists.deletedAt)
      throw new NotFoundException('User not found.');

    return this.usersService.softDeleteUser({
      id,
    });
  }
}
