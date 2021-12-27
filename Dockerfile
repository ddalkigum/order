FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install -g pm2 
RUN pm2 install typescript

COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:local"]