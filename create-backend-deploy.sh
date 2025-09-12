#!/bin/bash

# Create a backend-only deployment directory
echo "Creating backend-only deployment structure..."

# Create temp directory for backend-only deployment
mkdir -p /tmp/mindbloging-backend-deploy
cd /tmp/mindbloging-backend-deploy

# Initialize git
git init
git remote add origin https://github.com/Saransh240705/MindBlowing-Backend.git

# Copy backend files
cp -r /Users/saransh/Desktop/MindBlowing/backend/* .

# Create root-level package.json for deployment
cat > package.json << 'EOF'
{
  "name": "mindbloging-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcryptjs": "^3.0.2",
    "cors": "^2.8.5", 
    "dotenv": "^17.2.2",
    "express": "^5.1.0",
    "google-auth-library": "^10.3.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.18.0",
    "multer": "^2.0.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"
  }
}
EOF

# Create .env file
cat > .env << 'EOF'
MONGODB_URI=mongodb+srv://vsaransh6_db_user:LDwWgYlEZPYagkqP@cluster0.enjhtiu.mongodb.net/mindbloging
JWT_SECRET=your_super_secure_jwt_secret_key_2025_mindbloging_app
NODE_ENV=production
PORT=10000
CLIENT_URL=https://mind-blowing-m45n-9qmv0ole6-saransh240705s-projects.vercel.app
GOOGLE_CLIENT_ID=1025218204151-jdq0armnoj6765cp0779b17mjsonfusc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
EOF

# Create README
cat > README.md << 'EOF'
# MindBloging Backend

Backend API for the MindBloging application.

## Environment Variables

Make sure to set these in your deployment platform:

- MONGODB_URI
- JWT_SECRET  
- NODE_ENV
- PORT
- CLIENT_URL
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET

## Deployment

This backend is designed to be deployed on platforms like Render, Railway, or Heroku.

### Render.com
- Runtime: Node
- Build Command: npm install
- Start Command: node server.js
EOF

echo "Backend deployment structure created in /tmp/mindbloging-backend-deploy"
echo "You can now deploy this directory to Render or create a new GitHub repo from it."
