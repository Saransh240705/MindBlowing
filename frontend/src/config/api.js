// API configuration
const API = {
  BASE_URL: process.env.REACT_APP_API_URL || 'https://mindblowing.onrender.com',
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    GOOGLE_AUTH: '/api/auth/google',
    
    // Posts endpoints
    POSTS: '/api/posts',
    MY_POSTS: '/api/posts/my-posts',
    
    // Comments endpoints
    COMMENTS: '/api/comments',
  }
};

export { API };
