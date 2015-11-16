FROM php:5.6-apache
MAINTAINER Masanori Ohgita <mp@ohgita.info>

# Copy a source code to the root directory
COPY . /var/www/html/

# Copy the php.ini
COPY config/php.ini /usr/local/etc/php/

# Exposed in 80 port by php:5.6-apache
