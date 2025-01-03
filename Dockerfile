FROM node:lts-alpine

WORKDIR /api

COPY . .

RUN yarn

RUN apk add --no-cache bash
RUN apk add --no-cache libressl
RUN apk add --no-cache openssl

RUN yarn build

EXPOSE 8080

ENTRYPOINT ["./entrypoint.sh"]