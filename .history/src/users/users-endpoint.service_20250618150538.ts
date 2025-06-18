import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class UsersEndpointService {
  constructor(private readonly usersService: UsersService) {}

  async registerUser(data: { email: string; password: string; name: string }) {
    const existing = await this.usersService.findByEmail(data.email);
    if (existing) {
      throw new Error('User already exists');
    }
    return this.usersService.createUser(data);
  }

  async getUserProfile(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
