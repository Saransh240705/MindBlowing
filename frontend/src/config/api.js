// API configuration
const API = {
  BASE_URL: process.env.REACT_APP_API_URL || 'https://mindblowing.onrender.com',
  ENDPOINTS: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    GOOGLE_AUTH: '/api/auth/google',
    POSTS: '/api/posts',
    MY_POSTS: '/api/posts/my-posts',
    COMMENTS: '/api/comments',
  }
};

console.log('🚀 API Configuration:', {
  BASE_URL: API.BASE_URL,
  ENV_VAR: process.env.REACT_APP_API_URL
});

export { API };
