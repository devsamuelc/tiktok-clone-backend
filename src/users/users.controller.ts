import {
  Controller,
  Patch,
  Delete,
  Body,
  UseGuards,
  Post,
  Param,
  Get,
  ForbiddenException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEndpointService } from './users-endpoint.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { Authentication } from '../auth/decorators/auth.decorator';
import { IAuthentication } from '../auth/authentication';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersEndpointService: UsersEndpointService) {}

  @ApiOperation({ summary: 'Criar usuário' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ type: UserResponseDto })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ type: UserResponseDto })
  @Patch('/:userId')
  async updateUser(
    @Authentication() authentication: IAuthentication,
    @Param('userId') userId: string,
    @Body() body: UpdateUserDto,
  ) {
    const { authUserId } = authentication;

    if (!authUserId)
      throw new ForbiddenException(
        'Necessário login para realizar essa operação.',
      );

    const { email, name, password, permission } = body;

    return this.usersEndpointService.updateUser({
      id: userId,
      email,
      name,
      password,
      permission,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'userId', type: String })
  @ApiResponse({ type: UserResponseDto })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar usuário por ID' })
  @ApiParam({ name: 'userId', type: String })
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
