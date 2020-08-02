FROM node:12.2.0

WORKDIR /frontend
#ENV NODE_PATH=./src/
COPY package.json /frontend
COPY jsconfig.json /frontend

#test
RUN npm install

#COPY . .
CMD [ "npm", "start"]