FROM node:22-alpine

# To get timezones to work
RUN apk add --no-cache tzdata

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app
USER node
COPY --chown=node:node . .
RUN npm ci --no-optional

ENTRYPOINT [ "node", "--no-deprecation", "dist/main.js" ]
