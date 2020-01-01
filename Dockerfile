FROM node:lts-slim as base

WORKDIR /app

COPY package*.json yarn.lock /app/


# install dev dependencies
FROM base as builddep

RUN yarn install --production false


# build
FROM builddep as build

COPY . .

RUN yarn build


# copy dist and install production dependencies
FROM node:lts-slim

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/dist /app/package*.json /app/yarn.lock /app/

RUN yarn install

CMD ["node", "index.js"]