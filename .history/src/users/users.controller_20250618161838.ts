/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Controller,
  Patch,
  Delete,
  Body,
  UseGuards,
  Req,
  Post,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEndpointService } from './users-endpoint.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { Authentication } from '../auth/decorators/auth.decorator';
import { IAuthentication } from '../auth/authentication';

@Controller('users')
export class UsersController {
  constructor(private readonly usersEndpointService: UsersEndpointService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createUser(@Body() body: CreateUserDto) {
    const { email, name, password } = body;

    return this.usersEndpointService.createUser({
      email,
      name,
      password,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:userId')
  async updateUser(
    @Authentication() authentication: IAuthentication,
    @Param('userId') userId: string,
    @Body() body: UpdateUserDto,
  ) {
    const { authUserId } = authentication;

    return this.usersEndpointService.updateUser({
      id,
      email,
      name,
      password,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async deleteMe(@Req() req: Request) {
    const user = req.user as any;
    return this.usersEndpointService.deleteUser(user.userId);
  }
}
