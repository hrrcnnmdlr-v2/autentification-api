import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  private users: UserEntity[] = [];

  constructor(private jwtService: JwtService) {}
  
  async register(createAuthDto: CreateAuthDto) {
    const email = createAuthDto.email.trim().toLowerCase();

    if (email.endsWith('.ru')) {
      throw new BadRequestException('Registration from .ru email addresses is not allowed');
    }

    const exists = this.users.find(u => u.email === email);
    if (exists) throw new BadRequestException('Email is already exists');

    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    const newUser = {
      id: Date.now(),
      email,
      password: hashedPassword,
    };

    this.users.push(newUser);
    return { id: newUser.id, email: newUser.email };
  }

  async login(dto: CreateAuthDto) {
    const email = dto.email.trim().toLowerCase();
    const user = this.users.find(u => u.email === email);
    if (!user || !(await bcrypt.compare(dto.password, user.password!))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
