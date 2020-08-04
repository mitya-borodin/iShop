FROM node:12.18.3-alpine3.11

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY ./dist ./dist
COPY ./package.json ./package.json

RUN npm install --production

CMD ["node", "./dist/entry.js"]
