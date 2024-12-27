docker build -t nginx-server .

#                    nome container  nome volume									     nome network        imagem
docker run -d --name nginx-server -v delivery-volume:/var/www/html -p 80:80 --network delivery-network nginx-server