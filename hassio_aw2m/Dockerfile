FROM ghcr.io/neilenns/ambientweather2mqtt:latest
ENV PORT=8132

USER root
RUN apk add --update jq

COPY startup.sh /home/node/app/startup.sh
RUN chmod a+x /home/node/app/startup.sh

ENTRYPOINT [ "/bin/sh", "startup.sh" ]
