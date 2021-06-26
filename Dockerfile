FROM mhart/alpine-node:14 AS builder

RUN mkdir -p /usr/src/build
WORKDIR /usr/src/build

COPY / .
RUN rm *lock* && \
    yarn

FROM mhart/alpine-node:slim-14 AS runner

RUN apk add gettext --no-cache && \
    mkdir -p /usr/src/bot
COPY --from=builder /usr/src/build /usr/src/bot
WORKDIR /usr/src/bot
ENTRYPOINT /bin/sh -c "envsubst '\$TOKEN' < /usr/src/bot/cfg/auth-template.js > /usr/src/bot/cfg/auth.js && node main.js"
