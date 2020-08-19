# iShop

iShop - будет реализовывать функциональность интернет магазина. В котором будут автоматизировано создание постов для соц. сетей, выгрузка товаров на  платформы размещения товаров (Яндекс Маркет, Магазин Вконтакте), будут интегрированы платежные системы и платежные платформы как (https://stripe.com), будет реализована поддержка множественных витрин на доменах третьего уровня, и другие функции.  

## Окружение

- Необходимо установить Docker не старее `Docker version 19.03.12, build 48a66213fe`
- Необходимо установить NodeJs не старее `v12.13.0`

## Установка

```bash
npm i
npm run bootstrap
```

## Запуск режима разработки

- Запуск базы данных `docker-compose -f ./docker-compose.dev.yml up -d`
- Линковка пакета shared `npm run link:shared`, эта операция нужна для того, чтобы изменять пакет shared и сразу же видеть изменения в frontend и backend
- Запуск режима разработки для backend `npm run start:backend`
- Запуск режима разработки для frontend `npm run start:frontend`
- Запуск режима разработки для shared `npm run start:shared`

## Запуск production режима

Перед тем как запустить production конфигурацию необходимо:

- Собрать образа для backend `docker build --no-cache -f ./deployAssets/Dockerfile -t borodindmitriy/ishop-back-end:X.X.X .`.
- Собрать образа для frontend `docker build --no-cache -f ./deployAssets/Dockerfile -t borodindmitriy/ishop-front-end:X.X.X .`.
- Опубликовать образ backend `docker push borodindmitriy/ishop-back-end:X.X.X`
- Опубликовать образ frontend `docker push borodindmitriy/ishop-front-end:X.X.X`
- Обновить версии образов в docker-compose.prod.yml
- Запустить production среду `docker-compose -f ./docker-compose.prod.yml up -d`

## Пакет Shared

Этот пакет опубликован под именем `@rtcts/ishop-shared`, в глобальном репозитории, так как это позволит установить его внутри docker контейнера без организации доступа в приватный репозиторий.
