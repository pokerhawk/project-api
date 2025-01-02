FROM node:lts-alpine

WORKDIR /api

COPY . .

RUN yarn

RUN apk add --no-cache bash
RUN apk add --no-cache libressl
RUN apk add --no-cache openssl

RUN yarn build

# RUN npx prisma migrate deploy
# RUN npx prisma generate

# CMD ["yarn", "start:prod"]
# CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && yarn start:prod"]

EXPOSE 8080

ENTRYPOINT ["./entrypoint.sh"]