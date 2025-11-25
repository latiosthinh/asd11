#!/bin/ash

# build docker image for app using custom dockerfile
docker buildx build --no-cache -t asd11-yarn -f Dockerfile.yarn .

# run asd11-yarn container in detached mode with 2G memory limit
docker run -d \
    --name=asd11-yarn \
    --memory=2G \
    -p 3456:3456 \
    --restart=unless-stopped \
    asd11-yarn
    