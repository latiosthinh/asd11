#!/bin/sh

# check if package.json file exists
if [ ! -f "/app/package.json" ]; then

    # print error message
    echo "File package.json does not exist"

    # exit script
    exit 1
fi

# check if node_modules directory does not exist
if [ ! -d "/app/node_modules" ]; then

    # change directory to /app
    cd /app

    # install swc cli/core packages
    npm install --save-dev @swc/cli @swc/core

    # install npm packages
    npm install

    # build the application
    npm run build
fi

# check if node_modules directory still does not exist after attempted installation
if [ ! -d "/app/node_modules" ]; then

    # print error message
    echo "Cannot build the application"

    # exit script
    exit 1
fi

# change directory to /app
cd /app

# run node.js application
npm start
