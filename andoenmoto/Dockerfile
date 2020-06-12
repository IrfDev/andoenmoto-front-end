FROM node:10-alpine
  
RUN npm install -g http-server

COPY package*.json ./

RUN npm install -g @vue/cli@4.1.1
RUN npm install

COPY . .

RUN ls -a

RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]