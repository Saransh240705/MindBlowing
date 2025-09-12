#!/bin/bash
echo "Starting MindBloging Backend Server..."
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Current directory: $(pwd)"
echo "Files in current directory:"
ls -la
echo "Starting server..."
node server.js
