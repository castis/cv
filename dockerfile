FROM node:20-alpine AS dev
RUN yarn global add webpack webpack-cli webpack-dev-server typescript ts-node html-webpack-plugin 
WORKDIR /cv
