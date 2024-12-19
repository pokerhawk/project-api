FROM node:lts-alpine

# ENV DATABASE_URL="postgres://AmericanADMIN:AmericanFit@2024@localhost:5432/AmericanFit"
ENV API_KEY="95c86f32-7cde-4200-a508-f5c23ba6ac9f"
ENV JWT_SECRET="asKZ89sdf02432"
ENV REFRESH_SECRET="2m34l5kj2345dRi"

WORKDIR /api

COPY . .

RUN rm -rf node_modules

RUN yarn

#RUN npx prisma db pull

RUN npx prisma generate

#RUN npx prisma migrate dev

#RUN apk add --no-cache bash

RUN yarn build

CMD ["yarn", "start:prod"]

EXPOSE 8080
