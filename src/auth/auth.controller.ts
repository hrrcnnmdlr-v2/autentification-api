import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CustomAuthGuard } from './guards/custom.guard';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() loginDto: CreateAuthDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(CustomAuthGuard)
  @Get('me')
  getMe(@Req() request: any) {
    return { id: request.user.sub, email: request.user.email };
  }

  @Post('refresh')
  async refresh(@Body('token') token: string) {
    return this.authService.refresh(token);
  }
}
