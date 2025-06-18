import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';

interface ICreateUserParams {
  email: string;
  password: string;
  name: string;
}

interface IGetUserProfileParams {}

@Injectable()
export class UsersEndpointService {
  constructor(private readonly usersService: UsersService) {}

  async createUser(params: ICreateUserParams) {
    const { email } = params;

    const existing = await this.usersService.findByEmail({
      email,
    });
    if (existing) {
      throw new Error('Email already in use');
    }

    try {
      const user = await this.usersService.registerUser(params);

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    if (user) return user;

    throw new BadRequestException('');
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(
    userId: string,
    data: UsersEndpointService.UpdateUserInput,
  ) {
    return this.usersService.updateUser(userId, data);
  }

  async deleteUser(userId: string) {
    return this.usersService.softDeleteUser(userId);
  }
}
