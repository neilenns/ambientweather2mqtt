FROM ghcr.io/neilenns/ambientweather2mqtt:latest

USER root
RUN apk add --update jq

COPY startup.sh /
RUN chmod a+x /startup.sh

CMD [ "/startup.sh" ]
