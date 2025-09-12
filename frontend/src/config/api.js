// API configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: '/api/auth/register',
  LOGIN: '/api/auth/login',
  ME: '/api/auth/me',
  
  // Posts endpoints
  POSTS: '/api/posts',
  POST_BY_ID: (id) => `/api/posts/${id}`,
  MY_POSTS: '/api/posts/my/posts',
  CATEGORIES: '/api/posts/meta/categories',
  TAGS: '/api/posts/meta/tags',
  
  // Comments endpoints
  COMMENTS_BY_POST: (postId) => `/api/comments/post/${postId}`,
  COMMENTS: '/api/comments',
  COMMENT_BY_ID: (id) => `/api/comments/${id}`,
};

// Helper function to build full URL
export const buildApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;
