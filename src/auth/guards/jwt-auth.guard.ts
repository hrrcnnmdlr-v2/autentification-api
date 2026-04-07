import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired. Please log in again');
      }
      if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      }
      if (info?.message?.includes('No auth token')) {
        throw new UnauthorizedException('Token not provided. Please include the token in the Authorization header: Bearer <token>');
      }
      throw new UnauthorizedException(info?.message || 'Not authorized');
    }
    return user;
  }
}
