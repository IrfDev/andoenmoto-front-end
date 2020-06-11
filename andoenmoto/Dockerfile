FROM node:10-alpine

RUN npm install -g http-server
RUN npm i -g npm-check-updates

RUN npm-check-updates -u

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]