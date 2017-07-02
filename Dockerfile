FROM teradiot/alpine-ruby-libv8

ENV PATH /root/.yarn/bin:$PATH

RUN apk update \
  && apk add curl bash binutils tar build-base nodejs postgresql-dev git \
  && rm -rf /var/cache/apk/* \
  && /bin/bash \
  && touch ~/.bashrc \
  && curl -o- -L https://yarnpkg.com/install.sh | bash \
  && apk del git curl tar binutils

RUN mkdir /app
WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install --binstubs

COPY . .

LABEL maintainer="Nick Janetakis <nick.janetakis@gmail.com>"

CMD puma -C config/puma.rb
