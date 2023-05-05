FROM node:latest AS dev
RUN apt-get update && apt-get install -y python3-pip python3-dev build-essential
# RUN npm install webpack webpack-cli webpack-dev-server typescript ts-node html-webpack-plugin mini-css-extract-plugin css-loader sass-loader node-sass copy-webpack-plugin 

COPY package.json /cv/package.json
COPY package-lock.json /cv/package-lock.json
RUN npm install

WORKDIR /cv
