FROM mhart/alpine-node:14 AS builder

RUN mkdir -p /usr/src/build
WORKDIR /usr/src/build

COPY / .
RUN rm *lock* && \
    yarn

FROM mhart/alpine-node:slim-14 AS runner

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh && \
    apk add gettext --no-cache && \
    mkdir -p /usr/src/bot
COPY --from=builder /usr/src/build /usr/src/bot
ENTRYPOINT [ "/entrypoint.sh" ]
