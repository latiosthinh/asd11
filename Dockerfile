FROM node:alpine
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
CMD ["yarn", "dev"]
EXPOSE 3456