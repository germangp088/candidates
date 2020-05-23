FROM node:12-slim

WORKDIR /app

COPY package.json /app/package.json

RUN npm install --production

RUN npm build

COPY . /app

CMD ["npm","start"]

EXPOSE 3000