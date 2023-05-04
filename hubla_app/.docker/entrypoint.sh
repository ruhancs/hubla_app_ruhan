#!/bin/sh

cd client
npm install
cd ..
cd server
npm install
npm run build
npm install prisma --save-dev
cd ..
npm run start:docker