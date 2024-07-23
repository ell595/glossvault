#!/bin/sh

# Function to check if MySQL is ready
mysql_ready() {
    mysqladmin ping -h"$DB_HOST" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" > /dev/null 2>&1
}

# Wait for MySQL to be ready
until mysql_ready; do
    echo "MySQL is not ready - waiting..."
    sleep 1
done

echo "MySQL is ready! Proceeding with migrations..."

# Install dependencies
composer install

# Run migrations
php artisan migrate:fresh --seed

# Start PHP-FPM
php-fpm