#!/usr/bin/env bash

# Step 1: Install backend dependencies
cd backend
npm install

# Step 2: Go to frontend, install & build
cd ../frontend
npm install
npm run build

# Step 3: Serve the built frontend from backend
cd ../backend
npm start
