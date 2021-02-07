FROM node:lts-alpine

LABEL maintainer="dmitriy@borodin.site"

ENV SERVER_HOST="0.0.0.0"
ENV SERVER_PORT="10000"
ENV WS_HOST="0.0.0.0"
ENV WS_PORT="10001"

WORKDIR '/app'

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install

COPY ./ ./

RUN npm run build

EXPOSE 10000
EXPOSE 10001

CMD ["node", "./dist/src/entry.js"]