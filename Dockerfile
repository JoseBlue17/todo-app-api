FROM node:20.7.0-alpine
WORKDIR /node
ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn --production --pure-lockfile
COPY ../ .
RUN yarn build
EXPOSE 4000
CMD ["yarn", "start:prod"]
