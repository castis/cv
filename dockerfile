FROM node:latest AS dev
RUN apt-get update && apt-get install -y python3-pip python3-dev build-essential

WORKDIR /cv
COPY package*.json ./
RUN npm install
