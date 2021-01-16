FROM node:14-alpine as base

WORKDIR /src
COPY package*.json /
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
ENV HOST=https://rnexpo-server.herokuapp.com/
ENV PORT=80
RUN npm ci
COPY . /
CMD ["node", "bin/www"]

FROM base as dev
ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=3000
RUN npm install
COPY . /
CMD ["nodemon", "bin/www"]