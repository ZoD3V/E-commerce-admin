FROM node:18-alpine

COPY prisma /app/prisma

WORKDIR /app

COPY package**.json ./
RUN npm install

COPY . .
EXPOSE 3000
CMD npm run build