FROM nginx:1.15.5

LABEL maintainer="dmitriy@borodin.site"

COPY ./dist /usr/share/nginx/html
COPY ./buildAssets/ssl /usr/share/nginx/ssl
COPY ./buildAssets/nginx.conf /etc/nginx/conf.d/mysite.template
