FROM node:lts-alpine

LABEL maintainer="dmitriy@borodin.site"

WORKDIR '/app'

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install

COPY ./ ./

RUN npm run build

CMD ["node", "./dist/entry.js"]