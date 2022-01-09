FROM node:14.16.1-alpine3.10

ENV LC_ALL ko_KR.UTF-8
ENV TZ=Asia/Seoul

ENV ENV_NAME development
ENV NODE_ENV development
ENV LD_LIBRARY_PATH=/lib
ENV NLS_LANG=korean_korea.utf8

# Create Directory for container
WORKDIR /usr/app/src

# Install typescript global 
RUN npm install -g typescript

# Install pm2 
RUN npm install -g pm2 
RUN pm2 install typescript

# Copy package.json
COPY package.json .

# Install package 
RUN npm install

ADD . /usr/app/src

CMD ["npm", "run", "start:dev"]

EXPOSE 3000