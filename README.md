# e-commerce-nodejs

![CI](https://github.com/mitya-borodin/e-commerce-nodejs/workflows/CI/badge.svg)

[![Build Status](https://travis-ci.com/mitya-borodin/e-commerce-nodejs.svg?branch=master)](https://travis-ci.com/mitya-borodin/e-commerce-nodejs)

e-commerce-nodejs which is powered by modern technology. I selected method for testing technology interested for me through create e-commerce software. I will use [Svelte](https://svelte.dev), [Tailwind](https://tailwindcss.com), [Snowpack](https://www.snowpack.dev/), [Mobx](https://mobx.js.org/README.html), [RTCTS](https://github.com/mitya-borodin/rtcts), [NodeJS](https://nodejs.org/en/), [KoaJS](https://koajs.com), [MongoDB](https://www.mongodb.com/), [Redis](https://redis.io/), [Docker](https://www.docker.com/), [Docker-compose](https://docs.docker.com/compose/), [Nginx](https://nginx.org/), [Kubernetes](https://kubernetes.io/), [Ingress-nginx](https://kubernetes.github.io/ingress-nginx), [Cert-manager](https://cert-manager.io), [Helm](https://helm.sh), [Terraform](https://www.terraform.io/).

## @rtcts/ishop-shared

It is shared npm package which contains entities, enums, sets, types, dictionaries which will use on back-end and front-end and other sides.

## Environment

- Required `Docker version 19.03.12, build 48a66213fe` or more
- Required `node@12.13.0` `npm@6.12.0` or more
- Required `Terraform v0.13.5` or more
- Required `Google Cloud SDK 316.0.0` or more
- Required `kubectl 1.15.11` or more

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

## Deployment

Before deploy to GCP you need to install
[Terraform](https://learn.hashicorp.com/tutorials/terraform/infrastructure-as-code?in=terraform/gcp-get-started),
[Cloud SDK](https://cloud.google.com/sdk/docs/quickstart?hl=ru#mac),
[kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

1. Create a new project on GCP and write down the `Project ID` of it.
2. Generate a service account key:

    1. Go here: <https://console.cloud.google.com/apis/credentials/serviceaccountkey>
    2. Make sure your new project is selected in the top bar
    3. In **Service account** select `New service account`
    4. **Service account name**: `devops-owner`
    5. **Role**: `Project` -> `Owner`
    6. **Key type**: `JSON`
    7. Hit `Create` button
    8. Wait a bit and it will automatically download a *service account key file*.
    9. Save this file as `credentials/account.json`. If you don't want to save it to your git repo, add it to `.gitignore`. Keep in mind that this file gives full ownership access to the specific google project, so be careful whom you are sharing it with.

3. Move to `./terraform` and launch `terraform init` and `terraform apply`
4. After finish terraform work launch `./kubectl_g create secret generic data-base --from-literal=JWT_SECRET_KEY=some_secret_string --from-literal=DB_NAME=your_own_database_name`
5. After create secret you need to apply configs to cloud k8s `./kubectl_g apply -f ../k8s`

## CI/CD

For authorize in gcloud within travis-ci you need to encrypt `credentials/account.json` by travis tools.

For getting environment for travis-ci tools you need to install ruby:2.4, for avoid installation to you host system we will work inside docker container.

- Launch docker container `docker run -it -v $(pwd):/app ruby:2.4 sh`
- Move to app directory `cd ./app`
- Install travis `gem install travis`
- Login to travis `travis login --com`
- Encrypt `travis encrypt-file credentials/account.json -r mitya-borodin/e-commerce-nodejs --com`
- Add `openssl aes-256-cbc -K $encrypted_XXXXXXX_key -iv $encrypted_XXXXXXX_iv -in account.json.enc -out credentials/account.json -d` to `.travis.yml` as first item into `before_install`.
