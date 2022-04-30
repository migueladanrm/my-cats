FROM node:current-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 80

ENTRYPOINT ["node", "dist/index.js"]