<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A simple NestJS authentication app with static UI pages for register, login and profile.

## Environment setup

Create a `.env` file in `authentification_api/` with the following values:

```env
JWT_SECRET=supersecretkey123
JWT_EXPIRES_IN=1h
```

- `JWT_SECRET` is used to sign JWT access tokens.
- `JWT_EXPIRES_IN` controls token expiration.

## Install dependencies

```bash
cd authentification_api
npm install
```

## Run the app

```bash
npm run start:dev
```

Then open:

- `http://localhost:3000/` — home page
- `http://localhost:3000/register.html` — registration page
- `http://localhost:3000/login.html` — login page
- `http://localhost:3000/profile.html` — protected profile page

## How it works

- register: `POST /auth/register`
  - accepts `{ email, password }`
  - rejects `.ru` email addresses
- login: `POST /auth/login`
  - returns `{ access_token }`
- profile: `GET /auth/me`
  - requires `Authorization: Bearer <token>`

The frontend stores the token in `localStorage` and uses it to access `/auth/me` from `profile.html`.

## Frontend pages

Static UI files are served from the `public/` folder:

- `public/index.html`
- `public/register.html`
- `public/login.html`
- `public/profile.html`
- `public/styles.css`

## Notes

- User data is stored in memory only.
- This app is meant for local development and demo purposes.
- Tests are not modified in this documentation update.

## Tests

The project includes e2e coverage for auth behavior. Run:

```bash
npm run test:e2e
```

Current test cases include:

- `POST Register - SUCCESS`
- `POST Register - FAIL duplicate email`
- `POST Register - FAIL ru email address`
- `POST Register - FAIL short password`
- `POST Register - FAIL invalid email format`
- `POST Login - SUCCESS`
- `POST Login - FAIL wrong password`
- `POST Login - FAIL non-existing user`
- `GET Token - SUCCESS`
- `GET Token - FAIL missing token`
- `GET Token - FAIL invalid token`
- `GET Token - FAIL expired token`

## Commands

```bash
npm install
npm run start:dev
```

---

For now, keep the existing test files unchanged and use this README for setup and usage instructions.