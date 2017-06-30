FROM artwishlist/alpine-3.6-ruby-2.4.1

RUN apk update && apk add build-base nodejs postgresql-dev yarn

RUN mkdir /app
WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install --binstubs

COPY . .

LABEL maintainer="Nick Janetakis <nick.janetakis@gmail.com>"

CMD puma -C config/puma.rb
