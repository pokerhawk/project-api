#!/bin/sh

docker stop backend-app nginx-proxy
docker rm backend-app nginx-proxy
docker rmi project-api-backend-app project-api-nginx-proxy

echo y | docker system prune

mkdir certs

## SSL cert ##
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout certs/nginx-selfsigned.key \
    -out certs/nginx-selfsigned.crt

if ! docker ps -a | grep -q "project-database"; then
    docker compose -f ./db/docker-compose.yml up -d
fi

docker compose -f ./docker-compose.yml up -d

#docker exec -it <container_name> /bin/bash
#docker logs <container_name>
#docker network inspect <network_name>