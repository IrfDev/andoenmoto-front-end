FROM node:10-alpine

RUN npm install -g http-server

COPY package*.json ./

RUN npm install @vue/cli@3.7.0 -g
RUN npm install

COPY . .

RUN ls -a

RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]