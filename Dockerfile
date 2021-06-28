FROM node:14-alpine
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app
USER node
COPY --chown=node:node . .
RUN npm ci --no-optional

ENTRYPOINT [ "node", "--no-deprecation", "dist/main.js" ]