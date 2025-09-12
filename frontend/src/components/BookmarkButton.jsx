import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import axios from 'axios';
import { API_BASE_URL } from '../config/api.jsx';

const BookmarkButton = ({ postId, initialBookmarked = false }) => {
  const { isAuthenticated, token } = useContext(AuthContext);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);

  const checkBookmarkStatus = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/bookmarks/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const bookmarkedPosts = response.data;
      setIsBookmarked(bookmarkedPosts.some(post => post._id === postId));
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    }
  }, [token, postId]);

  useEffect(() => {
    if (isAuthenticated && postId) {
      checkBookmarkStatus();
    }
  }, [isAuthenticated, postId, checkBookmarkStatus]);

  const toggleBookmark = async () => {
    if (!isAuthenticated) {
      alert('Please login to bookmark posts');
      return;
    }

    setLoading(true);
    try {
      if (isBookmarked) {
        await axios.delete(`${API_BASE_URL}/posts/${postId}/bookmark`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsBookmarked(false);
      } else {
        await axios.post(`${API_BASE_URL}/posts/${postId}/bookmark`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      alert('Failed to update bookmark. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium transition-all duration-200 
        ${isBookmarked 
          ? 'bg-yellow-500 border-yellow-500 text-white hover:bg-yellow-600 hover:border-yellow-600' 
          : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-yellow-500 hover:text-yellow-500'
        }
        ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
        disabled:opacity-60 disabled:cursor-not-allowed`}
      onClick={toggleBookmark}
      disabled={loading}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <span className={`text-base transition-transform duration-200 ${!loading ? 'hover:scale-110' : ''}`}>
        {isBookmarked ? '🔖' : '📌'}
      </span>
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
};

export default BookmarkButton;
