#!/bin/sh
set -e

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "postgres" -U "postgres" -d "postgres" -c '\q'; do
  >&2 echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

rm -f /app/tmp/pids/server.pid

if [ "$RAILS_ENV" = "development" ]; then
  bundle exec rails db:create db:migrate db:seed
else
  bundle exec rails db:migrate
fi

exec "$@"