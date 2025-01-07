FROM nginx:latest

COPY certs .
# Copy custom NGINX config
# RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy manual SSL certificates
# COPY certs /etc/nginx/certs
# COPY ./certs /etc/ssl/certs