FROM node:lts-alpine

LABEL maintainer="dmitriy@borodin.site"

ENV NODE_ENV=production

WORKDIR '/app'

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install --production

COPY ./ ./

RUN npm run build

CMD ["node", "./dist/entry.js"]