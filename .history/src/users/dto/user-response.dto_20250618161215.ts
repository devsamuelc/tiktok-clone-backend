/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from '../../types/user';

export class UserResponseDto implements UserEntity {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date | null;
}
