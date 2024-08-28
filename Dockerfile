FROM node:20

WORKDIR /usr/api
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile


COPY . .

RUN yarn lint

RUN yarn build


EXPOSE 3090

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]