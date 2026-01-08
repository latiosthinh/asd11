#!/bin/sh

# check if package.json file exists
if [ ! -f "/app/package.json" ]; then

    # print error message
    echo "File package.json does not exist"

    # exit script
    exit 1
fi

# change directory to /app
cd /app

# run node.js application (build is done during Docker build)
yarn start
