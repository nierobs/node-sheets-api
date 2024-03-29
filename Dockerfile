FROM node:21.6-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . ./
EXPOSE 8080
CMD node app.js
