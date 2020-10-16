FROM node:lts-alpine

LABEL maintainer="dmitriy@borodin.site"

WORKDIR '/app'

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx:alpine
EXPOSE 3000
COPY --from=0 /app/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf