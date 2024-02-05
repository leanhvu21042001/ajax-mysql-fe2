FROM php:8.0-apache
# Set www-data to have UID 1000
RUN usermod -u 1000 www-data;
WORKDIR /var/www/html
# Add `www-data` to group `appuser`
RUN addgroup --gid 1000 appuser; \
  adduser --uid 1000 --gid 1000 --disabled-password appuser; \
  adduser www-data appuser;
# Add group write access to `storage`
RUN chmod -R 760 /var/www/html
RUN apt-get update -y && apt-get install -y libmariadb-dev
RUN docker-php-ext-install mysqli