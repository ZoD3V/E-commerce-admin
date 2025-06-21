FROM node:20-alpine AS build

COPY prisma /app/prisma

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run build

# -------------------------------

FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

COPY --from=build /app/.next /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
