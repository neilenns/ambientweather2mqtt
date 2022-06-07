FROM ghcr.io/neilenns/ambientweather2mqtt:latest

RUN apt-get install jq

COPY startup.sh /
RUN chmod a+x /startup.sh

CMD [ "/startup.sh" ]
