FROM php:8.0-apache
LABEL maintainer yt

# mailhog
RUN curl --location --output /usr/local/bin/mhsendmail https://github.com/mailhog/mhsendmail/releases/download/v0.2.0/mhsendmail_linux_amd64 && \
  chmod +x /usr/local/bin/mhsendmail
RUN echo 'sendmail_path="/usr/local/bin/mhsendmail --smtp-addr=mailhog:1025 --from=no-reply@docker.dev"' > /usr/local/etc/php/conf.d/mailhog.ini

# ADD
COPY ./php.ini /usr/local/etc/php
COPY ./apache2.conf /etc/apache2/conf-enabled

# xdebug install
# https://xdebug.org/docs/compat
# https://pecl.php.net/package/xdebug
# RUN pecl install xdebug && docker-php-ext-enable xdebug
RUN pecl install xdebug-3.2.0 && docker-php-ext-enable xdebug

RUN apt-get update \
  && apt-get install -y libfreetype6-dev libjpeg62-turbo-dev libpng-dev libjpeg-progs webp libmcrypt-dev vim \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install mysqli pdo_mysql gd

RUN a2enmod rewrite
