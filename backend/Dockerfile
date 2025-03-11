FROM ruby:3.2-alpine

# Install dependencies
RUN apk add --update --no-cache \
    build-base \
    sqlite-dev \
    sqlite \
    nodejs \
    tzdata \
    yaml-dev \
    gcompat \
    git \
    linux-headers

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
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000
CMD ["bundle", "exec", "rails", "s", "-b", "0.0.0.0"]