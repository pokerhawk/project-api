<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Dependencies

docker docker-compose nodejs npm yarn git

## Installation

```bash
# Create your .env file
$ chmod +x deploy.sh
$ ./deploy.sh
```

---

## Endpoints

**GET**

Check for authentication:

```
curl -X GET localhost:8080/auth/isAuthenticated?email=john@example.com
```

Get user by ID:

```
curl -X GET localhost:8080/user/byId?userId=string \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**POST**

Register:

```
curl -X POST localhost:8080/auth/register \
  -H "Content-Type: application/json"
  -d '{
    "name":"John",
    "email":"john@example.com",
    "password":"Password@123"
    }'
```

Login (requires 2fa auth):

```
curl -X POST localhost:8080/auth/login \
    -H "Content-Type: application/json"
    -d '{
    "email": "eliabedosreis@gmail.com",
    "password": "Abc@123",
    "code": "629760"
    }'
```

---

## Running the app

```bash
# install dep
$ yarn

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```