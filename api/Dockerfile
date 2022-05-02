FROM node:current-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 80

WORKDIR /app/dist

ENTRYPOINT ["node", "index.js"]