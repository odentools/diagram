FROM php:5.6-apache
MAINTAINER Masanori Ohgita <mp@ohgita.info>

# Install modules
RUN apt-get update && apt-get install -y \
	libmysql++-dev \
	&& docker-php-ext-install mysqli

# Copy the php.ini
COPY config/php.ini /usr/local/etc/php/

# Copy a source code to the root directory
COPY . /var/www/html/

# Exposed in 80 port by php:5.6-apache
