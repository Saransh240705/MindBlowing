import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard.jsx';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    tags: '',
    search: '',
  });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters.category) params.append('category', filters.category);
      if (filters.tags) params.append('tags', filters.tags);
      if (filters.search) params.append('search', filters.search);
      
      const response = await axios.get(`http://localhost:5001/api/posts?${params}`);
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPosts();
    fetchMetadata();
  }, [fetchPosts]);

  const fetchMetadata = async () => {
    try {
      const [categoriesRes, tagsRes] = await Promise.all([
        axios.get('http://localhost:5001/api/posts/meta/categories'),
        axios.get('http://localhost:5001/api/posts/meta/tags'),
      ]);
      
      setCategories(categoriesRes.data || []);
      setTags(tagsRes.data || []);
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      tags: '',
      search: '',
    });
  };

  return (
    <div className="py-8 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
            Welcome to MindBloging
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover amazing stories, ideas, and insights from our community of writers
          </p>
        </header>

        <div className="grid lg:grid-cols-[300px_1fr] md:grid-cols-[250px_1fr] grid-cols-1 gap-6 lg:gap-12 items-start">
          {/* Filters Sidebar */}
          <aside className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 sticky top-24 order-2 md:order-1">
            <div className="space-y-6">
              {/* Search Filter */}
              <div>
                <h3 className="text-base font-semibold mb-3 text-gray-900 dark:text-white">Search</h3>
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Categories Filter */}
              <div>
                <h3 className="text-base font-semibold mb-3 text-gray-900 dark:text-white">Categories</h3>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags Filter */}
              <div>
                <h3 className="text-base font-semibold mb-3 text-gray-900 dark:text-white">Tags</h3>
                <select
                  value={filters.tags}
                  onChange={(e) => handleFilterChange('tags', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Tags</option>
                  {tags.map((tag, index) => (
                    <option key={index} value={tag}>
                      #{tag}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters Button */}
              <button 
                onClick={clearFilters} 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Posts Main Content */}
          <main className="min-h-[400px] order-1 md:order-2">
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16 px-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">No posts found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or check back later for new content.</p>
              </div>
            ) : (
              <div className="grid gap-8">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
