# Use the official PHP image with necessary extensions
FROM php:8.2.0-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    mariadb-client  # Install mariadb-client for mysqladmin command

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy existing application directory contents
COPY . /var/www/html

# Copy existing application directory permissions
COPY --chown=www-data:www-data . /var/www/html

# Change current user to www
USER www-data

# Install dependencies
RUN composer install

# Add entrypoint script and make it executable
COPY entrypoint.sh /entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Expose port 8000 (if necessary)
EXPOSE 9000

