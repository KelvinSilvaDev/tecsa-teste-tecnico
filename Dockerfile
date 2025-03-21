FROM php:8.0-apache


RUN apt-get update && \
    apt-get install -y libonig-dev libzip-dev



RUN docker-php-ext-install pdo pdo_mysql


RUN a2enmod rewrite


COPY ./backend/ /var/www/html/backend/


RUN chown -R www-data:www-data /var/www/html/backend/
