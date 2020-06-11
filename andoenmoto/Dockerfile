FROM node:10-alpine

RUN npm install -g http-server
RUN npm i -g npm-check-updates

COPY package*.json ./

RUN npm-check-updates -u

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]