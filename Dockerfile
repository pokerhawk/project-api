FROM node:lts-alpine

ENV DATABASE_URL="postgres://DeliveryDB:DeliveryDB@2024@delivery-DB:5432/DeliveryDB"
ENV API_KEY="95c86f32-7cde-4200-a508-f5c23ba6ac9f"
ENV JWT_SECRET="asKZ89sdf02432"
ENV REFRESH_SECRET="2m34l5kj2345dRi"

WORKDIR /api

COPY . .

RUN rm -rf node_modules

RUN yarn

RUN apk add --no-cache bash
RUN apk add --no-cache libressl
RUN apk add --no-cache openssl

# RUN npx prisma db pull

#RUN npx prisma migrate deploy

#RUN npx prisma generate

RUN yarn build

#CMD ["yarn", "start:prod"]
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && yarn start:prod"]

EXPOSE 8080