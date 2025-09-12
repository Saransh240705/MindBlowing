import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RichTextEditor from '../components/RichTextEditor.jsx';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    featuredImage: '',
    isPublished: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };

      await axios.post('http://localhost:5001/api/posts', postData);
      navigate('/manage');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Create New Post</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Share your thoughts and ideas with the world</p>
        </header>

        <div className="max-w-3xl mx-auto">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-md">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-6 md:p-8 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="Enter an engaging title for your post"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="3"
                placeholder="A brief summary of your post (optional)"
              />
            </div>

            {/* Category and Tags Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="e.g., Technology, Travel, Food"
                />
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Separate tags with commas"
                />
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Featured Image URL
              </label>
              <input
                type="url"
                id="featuredImage"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Content *
              </label>
              <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                <RichTextEditor
                  value={formData.content}
                  onChange={handleContentChange}
                  placeholder="Start writing your amazing post..."
                />
              </div>
            </div>

            {/* Publish Checkbox */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({
                    ...formData,
                    isPublished: e.target.checked,
                  })}
                  className="w-5 h-5 text-primary-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="font-medium text-gray-900 dark:text-white">Publish immediately</span>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-300 dark:border-gray-600">
              <button
                type="button"
                onClick={() => navigate('/manage')}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-primary-300 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
