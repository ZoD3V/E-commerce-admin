FROM node:20-alpine AS build

WORKDIR /app

COPY prisma /app/prisma

COPY package*.json ./

RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app /app

RUN apk add --no-cache nginx

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Jalankan aplikasi Next.js SSR di background dan Nginx di foreground
CMD ["sh", "-c", "npm run start & nginx -g 'daemon off;'"]
