import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

interface IRegisterUserParams {
  email: string;
  password: string;
  name: string;
}

interface IGetUserProfileParams {}

@Injectable()
export class UsersEndpointService {
  constructor(private readonly usersService: UsersService) {}

  async registerUser(data: UsersEndpointService.RegisterUserInput) {
    const existing = await this.usersService.findByEmail(data.email);
    if (existing) {
      throw new Error('Email already in use');
    }
    return this.usersService.registerUser(data);
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
