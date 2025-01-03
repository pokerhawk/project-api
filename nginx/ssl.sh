#!/bin/sh

echo "creating certs dir"
mkdir certs
pwd
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout certs/nginx-selfsigned.key \
    -out certs/nginx-selfsigned.crt
