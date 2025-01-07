FROM nginx:latest

COPY certs .

COPY nginx.conf /etc/nginx/nginx.conf

# Copy manual SSL certificates
COPY ./certs /etc/ssl/certs