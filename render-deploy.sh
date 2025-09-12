#!/bin/bash
set -e

echo "🚀 Starting MindBloging Backend Deployment"
echo "Current directory: $(pwd)"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

echo "📁 Contents of current directory:"
ls -la

echo "📁 Contents of backend directory:"
ls -la backend/ || echo "Backend directory not found"

echo "📦 Installing backend dependencies..."
cd backend
npm install

echo "🔧 Starting server..."
node server.js
