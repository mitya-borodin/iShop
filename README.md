# e-commerce-nodejs

![CI](https://github.com/mitya-borodin/e-commerce-nodejs/workflows/CI/badge.svg)

[![Build Status](https://travis-ci.com/mitya-borodin/e-commerce-nodejs.svg?branch=master)](https://travis-ci.com/mitya-borodin/e-commerce-nodejs)

e-commerce-nodejs which is powered by modern technology. I selected method for testing technology interested for me through create e-commerce software. I will use [Svelte](https://svelte.dev), [Tailwind](https://tailwindcss.com), [Snowpack](https://www.snowpack.dev/), [Mobx](https://mobx.js.org/README.html), [RTCTS](https://github.com/mitya-borodin/rtcts), [NodeJS](https://nodejs.org/en/), [KoaJS](https://koajs.com), [MongoDB](https://www.mongodb.com/), [Redis](https://redis.io/), [Docker](https://www.docker.com/), [Docker-compose](https://docs.docker.com/compose/), [Nginx](https://nginx.org/), [Kubernetes](https://kubernetes.io/), [Helm](https://helm.sh), [Terraform](https://www.terraform.io/).

## @rtcts/ishop-shared

It is shared npm package which contains entities, enums, sets, types, dictionaries which will use on back-end and front-end and other sides.

## Environment

- Required `Docker version 19.03.12, build 48a66213fe` or more
- Required `node@12.13.0` `npm@6.12.0` or more

## Install

There is need to install node_modules to host system which will support lints, type declarations.

```bash
npm i
npm run bootstrap
```

## Develop mode

Before launch the next command you need to create self signed certificate.

```bash
cd nginx
mkdir ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./server.key -out ./server.crt
```

For launch dev mode you need run only once command.

```bash
docker-compose up
```

You will have access to web page through `https://localhost:3050`

### Debugging through VSCode

There is need to create `./vscode/launch.json` which contains:

``` json
{
  "version": "1.0.0",
  "configurations": [
    {
      "name": "Remote",
      "request": "attach",
      "address": "127.0.0.1",
      "port": 9229,
      "localRoot": "/app",
      "skipFiles": ["<node_internals>/**"],
      "type": "pwa-node"
    },
    {
      "type": "node",
      "request": "attach",
      "name": "Nodemon",
      "processId": "${command:PickProcess}",
      "restart": true,
      "protocol": "inspector"
    }
  ]
}

```
