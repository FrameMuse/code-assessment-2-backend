# Code assessment (Backend)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript repository.

## Installation

```bash
$ npm i
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

There are configurations such as [`Dockerfile`](./Dockerfile) and [`docker-compose.yml`](./docker-compose.yml).

To start MySQL DB

```bash
# To start DB service
$ docker-compose up
# To end DB service
$ docker-compose down
```

To build and run API image for production

```bash
# Build image with production target
$ docker build ./ --target production
# Run image
$ docker run [IMAGE]
```

## Migrartions

No migrations, tables are created using NestJS entities automatically.
