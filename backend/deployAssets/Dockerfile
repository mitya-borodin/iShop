FROM node:12.18.3-alpine3.11

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY ./dist/backend ./backend
COPY ./dist/shared ./shared
COPY ./package.json ./package.json

RUN npm install --production

CMD ["node", "./backend/src/entry.js"]
