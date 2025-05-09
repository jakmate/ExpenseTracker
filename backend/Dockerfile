FROM ruby:3.2-alpine

# Install dependencies (including dos2unix)
RUN apk add --update --no-cache \
    build-base \
    dos2unix \
    gcompat \
    git \
    linux-headers \
    nodejs \
    sqlite \
    sqlite-dev \
    tzdata \
    yaml-dev

# Configure environment
ENV RAILS_ENV=development \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_JOBS=4

WORKDIR /app

# Create storage directory with correct permissions
RUN mkdir -p storage tmp/pids && \
    chmod -R 777 storage tmp

# Install gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy application code
COPY . .

# Entrypoint for DB initialization
COPY entrypoint.sh /usr/bin/
RUN dos2unix /usr/bin/entrypoint.sh && \
    chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000
CMD ["bundle", "exec", "rails", "s", "-b", "0.0.0.0"]