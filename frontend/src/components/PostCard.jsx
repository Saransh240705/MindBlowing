import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post, showActions = false, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Post Meta */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 text-sm">
        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider self-start">
          {post.category}
        </span>
        <span className="text-gray-600 dark:text-gray-400">{formatDate(post.createdAt)}</span>
      </div>
      
      {/* Post Title */}
      <h2 className="mb-4 text-xl md:text-2xl font-bold leading-tight">
        <Link 
          to={`/post/${post._id}`} 
          className="text-gray-900 dark:text-white hover:text-blue-500 transition-colors no-underline"
        >
          {post.title}
        </Link>
      </h2>
      
      {/* Post Excerpt */}
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        {post.excerpt || truncateText(post.content)}
      </p>
      
      {/* Post Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Post Footer */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 gap-2">
        <div className="font-medium">
          By {post.author?.firstName} {post.author?.lastName}
        </div>
        
        <div className="flex gap-4">
          <span>{post.readingTime} min read</span>
          <span>{post.views} views</span>
        </div>
      </div>
      
      {/* Admin Actions */}
      {showActions && (
        <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 gap-2">
          <div className="flex gap-2">
            <button 
              onClick={() => onEdit(post._id)} 
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(post._id)} 
              className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
            >
              Delete
            </button>
          </div>
          
          <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase border ${
            post.isPublished 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' 
              : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800'
          }`}>
            {post.isPublished ? 'Published' : 'Draft'}
          </span>
        </div>
      )}
    </article>
  );
};

export default PostCard;
