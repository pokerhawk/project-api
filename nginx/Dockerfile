FROM nginx:latest

COPY certs .
# Copy custom NGINX config
# RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy SSL certificates
# COPY certs /etc/nginx/certs
COPY ./certs /etc/ssl/certs

RUN ls /etc/ssl/certs
RUN chmod 644 /etc/ssl/certs/nginx-selfsigned.crt
RUN chmod 600 /etc/ssl/private/nginx-selfsigned.key