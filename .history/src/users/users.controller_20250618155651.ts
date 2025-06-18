import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEndpointService } from './users-endpoint.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { Authentication } from '../auth/decorators/auth.decorator';
import { IAuthentication } from '../auth/authentication';

@Controller('users')
export class UsersController {
  constructor(private readonly usersEndpointService: UsersEndpointService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  async getMe(@Authentication() authentication: IAuthentication) {
    const { userId } = authentication;

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
