# 🚨 Google OAuth Origin Mismatch Fix

## The Problem
You're getting this error:
```
Access blocked: authorisation error
Error 400: origin_mismatch
```

This means `http://localhost:3000` is not registered as an authorized JavaScript origin in your Google Cloud Console.

## 🔧 Step-by-Step Fix

### 1. Go to Google Cloud Console
- Visit: https://console.cloud.google.com/
- Select your project (or create one if you don't have it)

### 2. Navigate to OAuth Credentials
- Go to **APIs & Services** → **Credentials**
- Find your **OAuth 2.0 Client ID** (or create one if you don't have it)
- Click the **edit (pencil) icon**

### 3. Add Authorized JavaScript Origins
In the **"Authorized JavaScript origins"** section, add:
```
http://localhost:3000
http://127.0.0.1:3000
```

### 4. Add Authorized Redirect URIs
In the **"Authorized redirect URIs"** section, add:
```
http://localhost:3000
http://localhost:3000/
```

### 5. Save and Wait
- Click **Save**
- Wait **5-10 minutes** for changes to propagate

### 6. Get Your Client ID
- Copy the **Client ID** from the credentials page
- It looks like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`

### 7. Configure Your App
Create a `.env.local` file in the `frontend` directory:

```bash
# In /Users/saransh/Desktop/MindBlowing/frontend/.env.local
REACT_APP_GOOGLE_CLIENT_ID=your-actual-client-id-here
REACT_APP_API_URL=https://mindblowing.onrender.com
```

### 8. Restart Your Development Server
```bash
cd frontend
npm start
```

## 🆘 If You Don't Have OAuth Credentials Yet

### Create New OAuth 2.0 Client ID:
1. In Google Cloud Console, go to **APIs & Services** → **Credentials**
2. Click **"+ CREATE CREDENTIALS"** → **"OAuth 2.0 Client ID"**
3. If prompted, configure the OAuth consent screen first
4. Application type: **"Web application"**
5. Name: **"MindBlowing App"** (or any name you prefer)
6. Add the origins and redirect URIs mentioned above
7. Click **"CREATE"**
8. Copy the Client ID

## 🔍 Troubleshooting

### Still getting errors?
1. **Check the exact URL** - Make sure you're accessing `http://localhost:3000` (not https)
2. **Clear browser cache** - Try incognito/private mode
3. **Wait longer** - Google's changes can take up to 10 minutes
4. **Check the Client ID** - Make sure it's correct in your .env.local file

### Verify your setup:
```bash
# Check if your .env.local file exists and has the right content
cat frontend/.env.local
```

## ✅ Success Indicators
- No more "origin_mismatch" error
- Google Sign-In button appears and works
- You can successfully authenticate with Google

## 📞 Need Help?
If you're still having issues, share:
1. Your Google Cloud Console screenshot (with origins configured)
2. The exact error message you're seeing
3. Your .env.local file content (with sensitive data redacted)
