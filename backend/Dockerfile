FROM node:21.3.0-slim as dev-backend
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
CMD [ "npm", "run", "dev" ]