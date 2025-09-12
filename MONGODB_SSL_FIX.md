# 🔧 MongoDB SSL Error Fix

## Problem
SSL/TLS error 80 (TLSV1_ALERT_INTERNAL_ERROR) with MongoDB Atlas connection.

## 🎯 Solutions (Try in Order)

### Solution 1: Alternative Connection Strings
Try these in your environment variables (one at a time):

**Option A - No SSL:**
```
MONGODB_URI=mongodb+srv://vsaransh6_db_user:LDwWgYlEZPYagkqP@cluster0.enjhtiu.mongodb.net/mindbloging?retryWrites=true&w=majority&ssl=false
```

**Option B - SSL with compatibility:**
```
MONGODB_URI=mongodb+srv://vsaransh6_db_user:LDwWgYlEZPYagkqP@cluster0.enjhtiu.mongodb.net/mindbloging?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true
```

**Option C - Alternative SSL mode:**
```
MONGODB_URI=mongodb+srv://vsaransh6_db_user:LDwWgYlEZPYagkqP@cluster0.enjhtiu.mongodb.net/mindbloging?retryWrites=true&w=majority&tls=true&tlsInsecure=true
```

### Solution 2: MongoDB Atlas Settings Fix

1. **Go to MongoDB Atlas Dashboard**
2. **Cluster → Network Access**
3. **Add IP Address → Allow access from anywhere (0.0.0.0/0)**
4. **Cluster → Database Access**
5. **Make sure your user has proper permissions**

### Solution 3: Use Standard Connection (Not SRV)
```
MONGODB_URI=mongodb://vsaransh6_db_user:LDwWgYlEZPYagkqP@cluster0-shard-00-00.enjhtiu.mongodb.net:27017,cluster0-shard-00-01.enjhtiu.mongodb.net:27017,cluster0-shard-00-02.enjhtiu.mongodb.net:27017/mindbloging?ssl=true&replicaSet=atlas-123abc-shard-0&authSource=admin&retryWrites=true&w=majority
```

### Solution 4: Update .env files

**Backend .env:**
```
MONGODB_URI=mongodb+srv://vsaransh6_db_user:LDwWgYlEZPYagkqP@cluster0.enjhtiu.mongodb.net/mindbloging?retryWrites=true&w=majority&ssl=false
JWT_SECRET=your_super_secure_jwt_secret_key_2025_mindbloging_app
NODE_ENV=production
PORT=10000
CLIENT_URL=https://mind-blowing-m45n-9qmv0ole6-saransh240705s-projects.vercel.app
GOOGLE_CLIENT_ID=1025218204151-jdq0armnoj6765cp0779b17mjsonfusc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

**Render Environment Variables (Set these in Render dashboard):**
- Add each variable individually
- Use the MONGODB_URI from Option A first

## 🧪 Testing

Test the connection locally:
```bash
cd backend
node -e "
const mongoose = require('mongoose');
const uri = 'mongodb+srv://vsaransh6_db_user:LDwWgYlEZPYagkqP@cluster0.enjhtiu.mongodb.net/mindbloging?ssl=false';
mongoose.connect(uri).then(() => {
  console.log('✅ Success!');
  process.exit(0);
}).catch(console.error);
"
```

## 🚨 If All Else Fails

Consider using a different MongoDB provider:
- **MongoDB Atlas Free Tier** (different region)
- **MongoDB Community Server** (local)
- **PlanetScale** (MySQL alternative)
- **Supabase** (PostgreSQL alternative)

## ✅ Expected Result
After fixing, you should see in logs:
```
✅ Connected to MongoDB successfully
Server is running on port 5001
```
