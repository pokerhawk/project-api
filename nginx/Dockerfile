FROM nginx:latest

COPY certs .
# Copy custom NGINX config
# RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy SSL certificates
# COPY certs /etc/nginx/certs
COPY ./certs /etc/ssl/certs

RUN cp /etc/ssl/certs/nginx-selfsigned.crt /usr/share/ca-certificates/
RUN update-ca-certificates