FROM node:latest AS dev
WORKDIR /cv
RUN npm install parcel @parcel/transformer-sass parcel-plugin-static-files-copy
EXPOSE 1234
