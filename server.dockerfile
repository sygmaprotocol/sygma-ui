
FROM node:18-alpine AS builder
RUN apk --no-cache add git
WORKDIR /app
COPY . .
RUN yarn set version stable
RUN yarn install --immutable
RUN ls -al
RUN ls -al ./packages/config-server
RUN yarn build:server


FROM node:18-alpine
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/packages/ ./packages

EXPOSE 8000

CMD [ "yarn", "start:config-server"]