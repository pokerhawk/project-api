echo "ENV DATABASE_URL="postgres://DeliveryDB:DeliveryDB@2024@$(hostname -I | awk '{print $2}'):5432/DeliveryDB"" >> ./Dockerfile

docker compose -f ./db/docker-compose.yml up -d
# docker compose -f ./docker-compose.yml down
docker compose -f ./docker-compose.yml up -d