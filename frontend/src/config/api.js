// Force production API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://mindblowing.onrender.com';

const API = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    GOOGLE_AUTH: '/api/auth/google',
    POSTS: '/api/posts',
    MY_POSTS: '/api/posts/my-posts',
    COMMENTS: '/api/comments',
  }
};

// Legacy exports for backward compatibility
const API_ENDPOINTS = {
  POSTS: '/api/posts',
  MY_POSTS: '/api/posts/my-posts',
  COMMENTS: '/api/comments',
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  GOOGLE_AUTH: '/api/auth/google',
};

const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Debug logging (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('API Configuration:', {
    BASE_URL: API.BASE_URL,
    NODE_ENV: process.env.NODE_ENV
  });
}

export { API, API_ENDPOINTS, buildApiUrl };
