# Dockerfile para el servidor (Node.js)
FROM node:21

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force
RUN npm install --force

COPY . ./

RUN mkdir -p /app/uploads/estatutos
RUN mkdir -p /app/uploads/premios
RUN mkdir -p /app/uploads/projects
RUN mkdir -p /app/uploads/users

RUN chown -R node:node /app/uploads

EXPOSE 5000

CMD ["npm", "start"]
