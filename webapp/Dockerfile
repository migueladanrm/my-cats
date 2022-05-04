FROM node:current-alpine AS build-stage
ARG API_BASE_URL
ARG GMAPS_API_KEY

WORKDIR /tmp

COPY . .

RUN yarn

RUN REACT_APP_API_BASE_URL=${API_BASE_URL} \
  REACT_APP_GMAPS_API_KEY=${GMAPS_API_KEY} \
  yarn build


FROM nginx:alpine AS run-stage

WORKDIR /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /tmp/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /tmp/build .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
