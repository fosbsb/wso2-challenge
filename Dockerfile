# Use a imagem oficial do PHP 7.4
FROM php:7.4-apache

# Atualize os pacotes e instale as dependências necessárias
RUN apt-get update && \
    apt-get install -y \
        libbz2-dev \
        libexif-dev \
        libgettextpo-dev \
        libgd-dev \
        libicu-dev \
        libmcrypt-dev \
        libpq-dev \
        libxml2-dev \
        libssl-dev \
        libonig-dev \
        zlib1g-dev \
        libxslt1-dev\
        libzip-dev\
        && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


# Instale as extensões PHP necessárias
RUN docker-php-ext-install \
    bcmath \
    exif \
    gettext \
    gd \
    intl \
    mysqli \
    pcntl \
    sockets\
    bz2 \
    calendar \
    shmop \
    sysvmsg \
    sysvsem \
    sysvshm \
    xsl

COPY php.ini /usr/local/etc/php/php.ini

# Copie os arquivos do seu projeto para o diretório de trabalho no contêiner
COPY app /var/www/html

RUN chown -R www-data:www-data /var/www/html

RUN a2enmod rewrite

# Exponha a porta 80 do contêiner
EXPOSE 80

# Inicialize o servidor Apache
CMD ["apache2-foreground"]