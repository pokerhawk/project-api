#!/bin/sh

docker stop backend-app
docker rm backend-app
docker rmi project-api-backend-app

echo y | docker system prune

if ! docker ps -a | grep -q "project-database"; then
    docker compose -f ./db/docker-compose.yml up -d
fi

docker compose -f ./docker-compose.yml up -d

#docker exec -it <container_name> /bin/bash
#docker logs <container_name>
#docker network inspect <network_name>