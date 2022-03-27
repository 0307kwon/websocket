FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/packages/server

EXPOSE 9001 3001
RUN echo "ready to run server"

CMD ["yarn", "start:prod"]
