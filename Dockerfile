FROM node:lts-alpine

#ENV DATABASE_URL=""

WORKDIR /api

COPY . .

RUN rm -rf node_modules

RUN yarn

RUN apk add --no-cache bash
RUN apk add --no-cache libressl
RUN apk add --no-cache openssl

# RUN npx prisma db pull

RUN npx prisma migrate deploy

RUN npx prisma generate

RUN yarn build

CMD ["yarn", "start:prod"]

EXPOSE 8080