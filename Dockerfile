FROM node:18-alpine

WORKDIR /baxi-client/
COPY public/ /baxi-client/public
COPY src/ /baxi-client/src
COPY package.json /baxi-client/

RUN npm install
CMD ["npm", "start"]