# echo -e "\nENV DATABASE_URL="postgres://DeliveryDB:DeliveryDB@2024@$(hostname -I | awk '{print $2}'):5432/DeliveryDB"" >> ./Dockerfile

docker stop backend-app
docker rm backend-app
docker rmi delivery-backend-api

# docker compose -f ./db/docker-compose.yml up -d
docker compose -f ./docker-compose.yml up -d

#docker exec -it <container_name> /bin/bash
#docker logs <container_name>
#docker network inspect <network_name>