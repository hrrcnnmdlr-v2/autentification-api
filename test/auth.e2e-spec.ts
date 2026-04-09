import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('Auth API (e2e)', () => {
  let app: INestApplication<App>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    jwtService = app.get<JwtService>(JwtService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST Register - SUCCESS', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'user@example.com', password: 'password1' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email', 'user@example.com');
  });

  it('POST Register - FAIL duplicate email', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'duplicate@example.com', password: 'password1' })
      .expect(201);

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'duplicate@example.com', password: 'password1' })
      .expect(400);

    expect(response.body.message).toEqual('Email is already exists');
  });

  it('POST Register - FAIL ru email address', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'blocked@example.ru', password: 'password1' })
      .expect(400);

    expect(response.body.message).toEqual('Registration from .ru email addresses is not allowed');
  });

  it('POST Register - FAIL short password', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'short@example.com', password: '123' })
      .expect(400);

    expect(response.body.message).toContain('Password should be at least 6 characters');
  });

  it('POST Register - FAIL invalid email format', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'invalid-email', password: 'password1' })
      .expect(400);

    expect(response.body.message).toContain('Please enter a valid email');
  });

  it('POST Login - SUCCESS', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'login@example.com', password: 'password1' })
      .expect(201);

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'login@example.com', password: 'password1' })
      .expect(201);

    expect(response.body).toHaveProperty('access_token');
  });

  it('POST Login - FAIL wrong password', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'wrongpass@example.com', password: 'password1' })
      .expect(201);

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'wrongpass@example.com', password: 'incorrect' })
      .expect(401);

    expect(response.body.message).toEqual('Invalid username or password');
  });

  it('POST Login - FAIL non-existing user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'missing@example.com', password: 'password1' })
      .expect(401);

    expect(response.body.message).toEqual('Invalid username or password');
  });

  it('GET Token - SUCCESS', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'token@example.com', password: 'password1' })
      .expect(201);

    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'token@example.com', password: 'password1' })
      .expect(201);

    const token = login.body.access_token;

    const profile = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(profile.body).toEqual(
      expect.objectContaining({
        email: 'token@example.com',
      }),
    );
  });

  it('GET Token - FAIL missing token', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/me')
      .expect(401);

    expect(response.body.message).toContain('Token not provided');
  });

  it('GET Token - FAIL invalid token', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', 'Bearer invalid.token')
      .expect(401);

    expect(response.body.message).toEqual('Invalid or expired token');
  });

  it('GET Token - FAIL expired token', async () => {
    const expiredToken = jwtService.sign({ sub: 1, email: 'expired@example.com' }, { expiresIn: '-1s' });

    const response = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${expiredToken}`)
      .expect(401);

    expect(response.body.message).toEqual('Invalid or expired token');
  });
});
