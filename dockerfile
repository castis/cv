FROM node:17-alpine AS dev
RUN yarn global add parcel
WORKDIR /cv
