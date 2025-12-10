#!/bin/sh

set -e

# echo "Running database migrations..."
# npx prisma migrate deploy --schema datatable-api/prisma/schema.prisma

echo "Running database reset & seeder..."
npm run prisma:reset -- -f

echo "Starting the application..."
exec "$@"
