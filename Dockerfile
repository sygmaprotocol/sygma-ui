
FROM node:18-alpine AS builder
RUN apk --no-cache add git
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile --network-timeout 100000
RUN ls -al

ARG CONFIG_SERVER_HOST
ARG CONFIG_SERVER_PORT
ARG REACT_APP_SUPPORT_SERVICE
ARG REACT_APP_SUPPORT_URL

RUN sh create-env-file.sh REACT_APP_CONFIG_SERVER_HOST=$CONFIG_SERVER_HOST REACT_APP_CONFIG_SERVER_PORT=$CONFIG_SERVER_PORT REACT_APP_SUPPORT_SERVICE=$REACT_APP_SUPPORT_SERVICE REACT_APP_SUPPORT_URL=$REACT_APP_SUPPORT_URL
CMD ["cat", "./packages/sygma-ui/.env"]

RUN yarn build:ui

# If you want to debug the .env file, uncomment the following line
# CMD ["cat", ".env"]

FROM nginx:1.19-alpine AS server
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/packages/sygma-ui/build /usr/share/nginx/html
EXPOSE 8000
