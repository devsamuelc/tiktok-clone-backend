import {
  Controller,
  Patch,
  Delete,
  Body,
  UseGuards,
  Post,
  Param,
  Get,
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
    // const { authUserId } = authentication;

    const { email, name, password } = body;

    return this.usersEndpointService.updateUser({
      id: userId,
      email,
      name,
      password,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  async findById(
    @Authentication() authentication: IAuthentication,
    @Param('userId') userId: string,
  ) {
    // const { authUserId } = authentication;

    return this.usersEndpointService.findById({
      id: userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:userId')
  async softDelete(
    @Authentication() authentication: IAuthentication,
    @Param('userId') userId: string,
  ) {
    // const { authUserId } = authentication;

    return this.usersEndpointService.softDeleteUser({
      id: userId,
    });
  }
}
