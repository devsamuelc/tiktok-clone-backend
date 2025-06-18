import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersEndpointService } from './users.endpoint.service';
import { Request } from 'express';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersEndpointService: UsersEndpointService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: Request) {
    const user = req.user as any;
    return this.usersEndpointService.getProfile(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateMe(@Req() req: Request, @Body() body: UpdateUserDto) {
    const user = req.user as any;
    return this.usersEndpointService.updateProfile({
      userId: user.userId,
      ...body,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async deleteMe(@Req() req: Request) {
    const user = req.user as any;
    return this.usersEndpointService.deleteUser(user.userId);
  }
}
