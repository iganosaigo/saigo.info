# Build image
FROM node:12-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY tsconfig.json .
COPY public /app/public
COPY src /app/src

RUN npm run build

# Main image
FROM nginx:1.23

COPY --from=build /app/build /usr/share/nginx/html

COPY Docker/nginx.conf /etc/nginx/nginx.conf

RUN mkdir /etc/nginx/vhost.d && \
    mkdir -p /tmp/nginx && \
    mkdir /tmp/nginx/proxy_cache && \
    mkdir /tmp/nginx/proxy_temp && \
    mkdir /tmp/nginx/client_body && \
    mkdir /tmp/nginx/fastcgi_temp && \
    mkdir /tmp/nginx/uwsgi_temp && \
    mkdir /tmp/nginx/scgi_temp && \
    chown -R nginx:nginx /tmp/nginx


ENTRYPOINT ["nginx", "-g", "daemon off;"]
