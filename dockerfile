FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/packages/server

RUN echo "ready to run server"

CMD ["yarn", "start:prod"]
