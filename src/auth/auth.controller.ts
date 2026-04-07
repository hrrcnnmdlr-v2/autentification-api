import { Controller, Post, Body, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() loginDto: CreateAuthDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  async getMe(@Headers('authorization') authorization: string) {
    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token not provided. Include Authorization: Bearer <token>');
    }

    const token = authorization.split(' ')[1];
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return { id: payload.sub, email: payload.email };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
