#!/bin/sh
set -e

rm -f /app/tmp/pids/server.pid

if [ "$RAILS_ENV" = "development" ]; then
  bundle exec rails db:prepare
else
  bundle exec rails db:migrate
fi

exec "$@"