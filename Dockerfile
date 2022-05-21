FROM node:16-alpine As development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build
FROM node:16-alpine As production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm set-script prepare ""
RUN npm install --omit=dev
COPY . .
COPY --from=development /usr/src/app/dist ./dist
CMD npm run start:prod