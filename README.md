# Authentification API

A simple NestJS authentication app with a React frontend powered by Vite and Mantine UI.

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
npm install
```

## Run the app

To run both the NestJS backend and Vite React frontend concurrently:

```bash
npm run start:both
```

Or you can run them separately:
- **Backend (NestJS)**: `npm run start:dev` (runs on `http://localhost:3000`)
- **Frontend (Vite)**: `npm run start:client` (runs on `http://localhost:5173`)

Then open:
- `http://localhost:5173/` — React frontend app

## How it works

### API Endpoints
- **Register**: `POST /auth/register`
  - accepts `{ email, password }`
  - rejects `.ru` email addresses
- **Login**: `POST /auth/login`
  - returns `{ access_token }`
- **Profile**: `GET /auth/me`
  - requires `Authorization: Bearer <token>`

### Frontend Architecture
The front-end is built using React, React Router, and Mantine for UI components.
- State and views are handled in `src/client/`.
- During development, Vite proxies `/auth` requests to the NestJS server.
- The UI handles user token storage and navigation natively as a SPA (Single Page Application).

## Build for production

```bash
npm run build
```
This builds both the NestJS app and Vite frontend (which outputs to the `public/` directory so NestJS can serve it statically on port 3000).

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

For now, keep the existing test files unchanged and use this README for setup and usage instructions.