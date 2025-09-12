import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReadingProgress from '../components/ReadingProgress.jsx';
import ShareButton from '../components/ShareButton.jsx';
import BookmarkButton from '../components/BookmarkButton.jsx';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPost = useCallback(async () => {
    try {
      const response = await axios.get(buildApiUrl(API_ENDPOINTS.POST_BY_ID(id)));
      setPost(response.data);
    } catch (error) {
      setError('Post not found');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(buildApiUrl(API_ENDPOINTS.COMMENTS_BY_POST(id)));
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [fetchPost, fetchComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setCommentLoading(true);
    try {
      await axios.post(buildApiUrl(API_ENDPOINTS.COMMENTS), {
        content: newComment,
        postId: id,
      });
      
      setNewComment('');
      fetchComments(); // Refresh comments
    } catch (error) {
      setError('Failed to add comment. Please login to comment.');
    } finally {
      setCommentLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/')} 
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <ReadingProgress />
      
      <div className="max-w-4xl mx-auto">
        <article className="max-w-3xl mx-auto mb-16">
          {/* Post Header */}
          <header className="text-center mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-gray-600 dark:text-gray-300 text-sm">{formatDate(post.createdAt)}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-8 text-gray-900 dark:text-white">
              {post.title}
            </h1>
            
            <div className="flex flex-col lg:flex-row items-center justify-between p-6 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg mb-8">
              <div className="flex flex-col items-center lg:items-start mb-4 lg:mb-0">
                <span className="font-semibold text-gray-900 dark:text-white mb-2">
                  By {post.author?.firstName} {post.author?.lastName}
                </span>
                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <span>{post.readingTime} min read</span>
                  <span className="text-blue-500 font-semibold">👀 {post.views} views</span>
                </div>
              </div>
              
              <div className="flex gap-3 items-center">
                <ShareButton 
                  title={post.title}
                  description={post.excerpt}
                />
                <BookmarkButton postId={post._id} />
              </div>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>
          
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-12 text-center">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}
          
          {/* Post Content */}
          <div 
            className="prose prose-lg max-w-none text-gray-900 dark:text-white
              prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:font-bold
              prose-p:mb-6 prose-p:leading-relaxed
              prose-img:rounded-lg prose-img:my-8
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-300
              prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
        
        {/* Comments Section */}
        <section className="max-w-3xl mx-auto border-t-2 border-gray-300 dark:border-gray-600 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Comments ({comments.length})
          </h2>
          
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-6 mb-8">
            <div className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="3"
                required
              />
            </div>
            <button
              type="submit"
              disabled={commentLoading}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 dark:disabled:bg-blue-800 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              {commentLoading ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
          
          {/* Comments List */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-300 py-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {comment.author?.firstName} {comment.author?.lastName}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <div className="text-gray-900 dark:text-white leading-relaxed">
                    {comment.content}
                  </div>
                  {comment.isEdited && (
                    <span className="text-gray-600 dark:text-gray-300 text-xs italic mt-2 block">
                      (edited)
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostDetail;
