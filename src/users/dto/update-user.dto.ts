import { ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export enum EUserPermissions {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ type: String })
  email?: string;

  @IsOptional()
  @MinLength(6)
  @ApiPropertyOptional({ type: String })
  password?: string;

  @IsOptional()
  @MinLength(6)
  @ApiPropertyOptional({ enum: EUserPermissions })
  permission?: $Enums.UserPermissions;
}
