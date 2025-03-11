#!/bin/sh
set -e

rm -f /app/tmp/pids/server.pid

# Run migrations only if needed
if ! bundle exec rails db:version >/dev/null 2>&1; then
  bundle exec rails db:create
fi
bundle exec rails db:migrate

exec "$@"