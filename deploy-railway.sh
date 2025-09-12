#!/bin/bash

# Quick Railway Deployment Script
echo "Deploying MindBloging Backend to Railway..."

echo "1. Install Railway CLI:"
echo "npm install -g @railway/cli"
echo ""

echo "2. Login to Railway:"
echo "railway login"
echo ""

echo "3. Create new project:"
echo "cd backend"
echo "railway init"
echo ""

echo "4. Add environment variables:"
echo "railway variables set MONGODB_URI=\"mongodb+srv://vsaransh6_db_user:LDwWgYlEZPYagkqP@cluster0.enjhtiu.mongodb.net/mindbloging\""
echo "railway variables set JWT_SECRET=\"your_super_secure_jwt_secret_key_2025_mindbloging_app\""
echo "railway variables set NODE_ENV=\"production\""
echo "railway variables set CLIENT_URL=\"https://mind-blowing-m45n-9qmv0ole6-saransh240705s-projects.vercel.app\""
echo "railway variables set GOOGLE_CLIENT_ID=\"1025218204151-jdq0armnoj6765cp0779b17mjsonfusc.apps.googleusercontent.com\""
echo "railway variables set GOOGLE_CLIENT_SECRET=\"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\""
echo ""

echo "5. Deploy:"
echo "railway up"
echo ""

echo "6. Get your deployment URL:"
echo "railway status"
