FROM node:alpine
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
CMD ["yarn", "build"]
CMD ["yarn", "start"]
EXPOSE 3456