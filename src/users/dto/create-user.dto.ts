import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ type: String })
  email!: string;

  @MinLength(6)
  @ApiProperty({ type: String })
  password!: string;

  @IsString()
  @ApiProperty({ type: String })
  name!: string;
}
