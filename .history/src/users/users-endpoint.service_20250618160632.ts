import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, User as UserModel } from '@prisma/client';

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

interface IGetUserProfileParams {}

@Injectable()
export class UsersEndpointService {
  constructor(private readonly usersService: UsersService) {}

  async createUser(params: ICreateUserParams): Promise<UserModel> {
    const { email, name, password } = params;

    const userExists = await this.usersService.findByEmail({
      email
    })

    if(userExists) throw new BadRequestException('User email already registered!');

    return this.usersService.createUser({
      email,
      name,
      password
    })
  }

  async updateUser(params: IUpdateUserParams): Promise<UserModel> {
    const { id, email, name, password } = params;


    const userExists = await this.usersService.findById({
      id
    })

    if(userExists) throw new BadRequestException('User email already registered!');

    return this.usersService.createUser({
      email,
      name,
      password
    })
  }
async findByEmail
async findById
async softDeleteUser
}
