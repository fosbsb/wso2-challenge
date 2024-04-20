# Use a imagem oficial do PHP 7.4
FROM php:7.4-apache

ARG USERNAME=fosbsb
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************

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
USER $USERNAME
# Exponha a porta 80 do contêiner
EXPOSE 80

# Inicialize o servidor Apache
CMD ["apache2-foreground"]