# Dockerfile para el servidor (Node.js)
FROM node:21

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force
RUN npm install -g pnpm
RUN pnpm install

COPY . ./

EXPOSE 5000

CMD ["npm", "start"]
