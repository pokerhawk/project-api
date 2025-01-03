FROM nginx:latest

# Copy custom NGINX config
# RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

RUN pwd
# Copy SSL certificates
COPY certs /etc/nginx/certs