#!/bin/sh

# Replace all specified environment variables in nginx configuration file
envsubst '
  ${SERVER_NAME}
  ${SERVER_PORT}
  ${BACKEND_PATH}
  ${FRONTEND_HOST}
  ${FRONTEND_PORT}
  ${BACKEND_HOST}
  ${BACKEND_PORT}
' < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf.tmp && mv /etc/nginx/nginx.conf.tmp /etc/nginx/nginx.conf

nginx -g "daemon off;"