#!/usr/bin/env bash

echo "🔧 Installing backend dependencies..."
cd backend || exit
npm install

echo "🔧 Installing frontend dependencies and building..."
cd ../frontend || exit
npm install
npm run build

echo "📦 Copying frontend build to backend/public..."
rm -rf ../backend/public
mkdir -p ../backend/public
cp -r build/* ../backend/public/

echo "🚀 Starting server from backend..."
cd ../backend || exit
node server.js
