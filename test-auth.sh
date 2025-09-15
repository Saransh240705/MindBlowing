#!/bin/bash
# Test script for auth endpoints

# Set API URL
API_URL="https://mindblowing.onrender.com"

echo "🧪 Testing Auth Endpoints"
echo "=========================="

echo -e "\n1️⃣ Testing Registration with valid data"
curl -s -X POST "$API_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser'$(date +%s)'",
    "email": "testuser'$(date +%s)'@example.com",
    "password": "Test@123",
    "firstName": "Test",
    "lastName": "User"
  }' | jq

echo -e "\n2️⃣ Testing Registration with existing user"
curl -s -X POST "$API_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test@123",
    "firstName": "Test",
    "lastName": "User"
  }' | jq

echo -e "\n3️⃣ Testing Registration with invalid data (missing fields)"
curl -s -X POST "$API_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "incomplete@example.com",
    "password": "Test@123"
  }' | jq

echo -e "\n4️⃣ Testing Login with valid credentials"
curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }' | jq

echo -e "\n5️⃣ Testing Login with invalid credentials"
curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "wrongpassword"
  }' | jq

echo -e "\n✅ Tests completed!"
