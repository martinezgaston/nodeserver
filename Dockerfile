FROM node:10-alpine

WORKDIR /confusinServer

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm","start"]