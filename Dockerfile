FROM node:14-alpine
ENV NODE_ENV=docker
ENV API_HOST=http://cms-backend:8000
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]