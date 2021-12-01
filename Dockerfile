# This uses version 3.12 to work around an incompatibiltiy on Raspberry Pi devices.
# See comments on issue 64 for more details.
# https://github.com/neilenns/ambientweather2mqtt/issues/64
FROM node:14-alpine3.12
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app
USER node
COPY --chown=node:node . .
RUN npm ci --no-optional

ENTRYPOINT [ "node", "--no-deprecation", "dist/main.js" ]#