import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard.jsx';

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5001/api/posts/my/posts');
      setPosts(response.data);
    } catch (error) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`);
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:5001/api/posts/${postId}`);
        setPosts(posts.filter(post => post._id !== postId));
      } catch (error) {
        setError('Failed to delete post');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <header className="mb-12">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center p-6 lg:p-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">My Posts</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">Manage your blog posts</p>
            </div>
            <button
              onClick={() => navigate('/create')}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 self-start lg:self-auto"
            >
              Create New Post
            </button>
          </div>
        </header>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-md">
            {error}
          </div>
        )}

        {/* Posts Content */}
        <div className="min-h-[400px]">
          {posts.length === 0 ? (
            <div className="text-center py-16 px-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">No posts yet</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                You haven't created any posts yet. Start writing your first post!
              </p>
              <button
                onClick={() => navigate('/create')}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Create Your First Post
              </button>
            </div>
          ) : (
            <div className="grid gap-8">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  showActions={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagePosts;
