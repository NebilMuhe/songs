FROM node:alpine

WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
COPY .env ./

EXPOSE 4000 

CMD ["npm", "start"]