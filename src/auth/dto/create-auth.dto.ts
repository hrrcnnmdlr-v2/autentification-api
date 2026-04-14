import { IsEmail, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsEmail({}, { message: 'Please enter a valid email' })
  email!: string;

  @MinLength(6, { message: 'Password should be at least 6 characters' })
  password!: string;
}