#!/bin/sh

docker stop backend-app nginx-proxy
docker rm backend-app nginx-proxy
docker rmi project-api-backend-app project-api-nginx-proxy

echo y | docker system prune

chmod +x ./nginx/ssl.sh
./nginx/ssl.sh
chmod -x ./nginx/ssl.sh

if ! docker ps -a | grep -q "project-database"; then
    docker compose -f ./db/docker-compose.yml up -d
fi

docker compose -f ./docker-compose.yml up -d

#docker exec -it <container_name> /bin/bash
#docker logs <container_name>
#docker network inspect <network_name>