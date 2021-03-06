FROM node:14-alpine AS builder

RUN mkdir -p /usr/src/build
WORKDIR /usr/src/build

COPY / .
RUN rm *lock* && \
    yarn

FROM node:14-alpine AS runner

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh && \
    apk add gettext --no-cache && \
    mkdir -p /usr/src/bot
COPY --from=builder /usr/src/build /usr/src/bot
ENTRYPOINT [ "/entrypoint.sh" ]