FROM node:alpine

WORKDIR /opt/server

RUN apk update && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium

COPY . .

RUN yarn

EXPOSE 13428

CMD NODE_ENV=production yarn serve
