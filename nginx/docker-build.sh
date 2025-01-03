docker build -t nginx-server .

#                    nome container  nome volume									     nome network        imagem
docker run -d --name nginx-server -v project-volume:/var/www/html -p 80:80 --network project-network nginx-server