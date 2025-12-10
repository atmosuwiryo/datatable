#!/bin/sh

set -e

# echo "Running database migrations..."
# npx prisma migrate deploy --schema datatable-api/prisma/schema.prisma

echo "Running database reset & seeder..."
npx prisma migrate deploy --schema datatable-api/prisma/schema.prisma

echo "Starting the application..."
exec "$@"
