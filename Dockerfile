# Deploy for AWS ECR
FROM node:16

ENV LC_ALL ko_KR.UTF-8
ENV TZ=Asia/Seoul

ENV ENV_NAME development
ENV NODE_ENV development
ENV LD_LIBRARY_PATH=/lib
ENV NLS_LANG=korean_korea.utf8

# Create Directory for container
WORKDIR /app

# Copy package.json
COPY package.json .

# Install package 
RUN npm install

ADD . /app

CMD ["npm", "run", "build"]
CMD ["npm", "run", "start:dev"]

EXPOSE 3000