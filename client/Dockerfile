# Dockerfile para el cliente (React)
FROM node:21 as builder

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force
RUN npm install -g pnpm
RUN pnpm install

COPY . ./

RUN pnpm run build

FROM nginx:alpine

# Eliminar la configuración predeterminada de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar la configuración personalizada de Nginx
COPY default.conf /etc/nginx/conf.d/

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
