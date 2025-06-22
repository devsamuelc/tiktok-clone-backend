import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from '../../types/user';
import { $Enums } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto implements UserEntity {
  @Expose()
  @ApiProperty({ type: String })
  id!: string;

  @Expose()
  @ApiProperty({ type: String })
  name!: string;

  @Expose()
  @ApiProperty({ type: String })
  email!: string;

  @Exclude()
  password!: string;

  @Expose()
  @ApiProperty({ type: Date })
  createdAt!: Date;

  @Expose()
  @ApiProperty({ type: String })
  permission: $Enums.UserPermissions;

  @Exclude()
  refreshToken: string | null;

  @Expose()
  @ApiProperty({ type: Date })
  updatedAt!: Date;

  @Exclude()
  deletedAt!: Date | null;
}
