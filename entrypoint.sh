#!/bin/sh

chmod -x ./deploy.sh
chmod -x ./entrypoint.sh

npx prisma migrate deploy
npx prisma generate
yarn start:prod