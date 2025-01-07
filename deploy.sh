#!/bin/sh

docker stop backend-app nginx-proxy
docker rm backend-app nginx-proxy
docker rmi project-api-nginx project-api-backend-app postgres certbot/certbot

echo y | docker system prune

mkdir ~/project-api/nginx/certs

## SSL manual cert ##
# openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
#     -keyout ~/project-api/nginx/certs/nginx-selfsigned.key \
#     -out ~/project-api/nginx/certs/nginx-selfsigned.crt \
#     -subj "/C=BR/ST=Minas Gerais/L=Belo Horizonte/O=My Company/OU=IT Department/CN=localhost"

if ! docker ps -a | grep -q "project-database"; then
    docker compose -f ./db/docker-compose.yml up -d
fi

docker compose -f ./docker-compose.yml up -d

unset DOMAIN_NAME

#docker exec -it <container_name> /bin/bash
#docker logs <container_name>
#docker network inspect <network_name>

# SSL certificate on the machine you're using curl from:
# RUN cp /etc/ssl/certs/nginx-selfsigned.crt /usr/share/ca-certificates/
# RUN update-ca-certificates