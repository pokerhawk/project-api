#!/bin/sh

npx prisma migrate deploy
npx prisma generate
yarn start:prod