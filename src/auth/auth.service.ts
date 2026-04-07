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
    const exists = this.users.find(u => u.email === createAuthDto.email);
    if (exists) throw new BadRequestException('Email is already registered');

    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    const newUser = { 
      id: Date.now(), 
      email: createAuthDto.email, 
      password: hashedPassword 
    };
    
    this.users.push(newUser);
    return { id: newUser.id, email: newUser.email };
  }

  async login(dto: CreateAuthDto) {
    const user = this.users.find(u => u.email === dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password!))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
