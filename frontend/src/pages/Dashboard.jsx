import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api.jsx';

const Dashboard = () => {
  const { isAuthenticated, token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    avatar: ''
  });
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
    
    // Initialize profile data when user data is available
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: user.bio || '',
        avatar: user.avatar || ''
      });
    }
  }, [isAuthenticated, navigate, fetchDashboardData, user]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileUpdateLoading(true);
    setProfileError('');
    setProfileSuccess('');

    try {
      await axios.put('http://localhost:5001/api/auth/profile', profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setProfileSuccess('Profile updated successfully!');
      setEditingProfile(false);
      
      // Update the user context with new data
      // You might want to refresh the user data here
      setTimeout(() => {
        window.location.reload(); // Simple way to refresh user data
      }, 1000);
      
    } catch (error) {
      setProfileError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setProfileUpdateLoading(false);
    }
  };

  const cancelProfileEdit = () => {
    setEditingProfile(false);
    setProfileError('');
    setProfileSuccess('');
    // Reset form data
    setProfileData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      bio: user?.bio || '',
      avatar: user?.avatar || ''
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
        <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Dashboard Header */}
        <header className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm border border-gray-300 dark:border-gray-600">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-primary-500 flex items-center justify-center">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.firstName}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              <div className={`w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold ${user?.avatar ? 'hidden' : 'flex'}`}>
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-base">Here's your blog overview</p>
            </div>
          </div>
        </header>

        {/* Dashboard Navigation */}
        <nav className="flex flex-wrap gap-2 mb-6">
          <button
            className={`px-5 py-3 rounded-lg font-medium text-sm transition-all shadow-sm ${
              activeTab === 'overview'
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-muted border border-gray-300 dark:border-gray-600'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button
            className={`px-5 py-3 rounded-lg font-medium text-sm transition-all shadow-sm ${
              activeTab === 'posts'
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-muted border border-gray-300 dark:border-gray-600'
            }`}
            onClick={() => setActiveTab('posts')}
          >
            📝 My Posts
          </button>
          <button
            className={`px-5 py-3 rounded-lg font-medium text-sm transition-all shadow-sm ${
              activeTab === 'profile'
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-muted border border-gray-300 dark:border-gray-600'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Profile
          </button>
        </nav>

        {/* Dashboard Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600 shadow-sm">
          {activeTab === 'overview' && (
            <div className="p-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">📝</div>
                    <div>
                      <h3 className="text-2xl font-bold">{dashboardData?.stats?.totalPosts || 0}</h3>
                      <p className="text-blue-100">Total Posts</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">👀</div>
                    <div>
                      <h3 className="text-2xl font-bold">{dashboardData?.stats?.totalViews || 0}</h3>
                      <p className="text-green-100">Total Views</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">💬</div>
                    <div>
                      <h3 className="text-2xl font-bold">{dashboardData?.stats?.totalComments || 0}</h3>
                      <p className="text-purple-100">Comments Received</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-lg text-white">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🔖</div>
                    <div>
                      <h3 className="text-2xl font-bold">{dashboardData?.stats?.totalBookmarks || 0}</h3>
                      <p className="text-yellow-100">Bookmarked Posts</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Posts */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Posts</h3>
                  <div className="space-y-3">
                    {dashboardData?.recentPosts?.length > 0 ? (
                      dashboardData.recentPosts.map(post => (
                        <div key={post._id} className="p-4 bg-muted rounded-lg border border-gray-300 dark:border-gray-600">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">{post.title}</h4>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300">
                            <span>{formatDate(post.createdAt)}</span>
                            <span>{post.views} views</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              post.isPublished 
                                ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
                                : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                            }`}>
                              {post.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300 text-center py-8">No posts yet. Start writing!</p>
                    )}
                  </div>
                </div>

                {/* Popular Posts */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Most Popular Posts</h3>
                  <div className="space-y-3">
                    {dashboardData?.popularPosts?.length > 0 ? (
                      dashboardData.popularPosts.map(post => (
                        <div key={post._id} className="p-4 bg-muted rounded-lg border border-gray-300 dark:border-gray-600">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">{post.title}</h4>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300">
                            <span>{formatDate(post.createdAt)}</span>
                            <span className="text-primary-500 font-medium">{post.views} views</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300 text-center py-8">No posts yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Posts</h2>
                <button 
                  className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  onClick={() => navigate('/create')}
                >
                  ✏️ Write New Post
                </button>
              </div>
              <button
                className="w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-muted transition-colors"
                onClick={() => navigate('/manage')}
              >
                📋 Manage All Posts
              </button>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Settings</h2>
              <div className="space-y-4 max-w-md">
                <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-300 dark:border-gray-600">
                  <label className="font-medium text-gray-900 dark:text-white">First Name:</label>
                  <span className="text-gray-600 dark:text-gray-300">{user?.firstName}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-300 dark:border-gray-600">
                  <label className="font-medium text-gray-900 dark:text-white">Last Name:</label>
                  <span className="text-gray-600 dark:text-gray-300">{user?.lastName}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-300 dark:border-gray-600">
                  <label className="font-medium text-gray-900 dark:text-white">Email:</label>
                  <span className="text-gray-600 dark:text-gray-300">{user?.email}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-300 dark:border-gray-600">
                  <label className="font-medium text-gray-900 dark:text-white">Username:</label>
                  <span className="text-gray-600 dark:text-gray-300">{user?.username}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-300 dark:border-gray-600">
                  <label className="font-medium text-gray-900 dark:text-white">Member since:</label>
                  <span className="text-gray-600 dark:text-gray-300">{formatDate(user?.createdAt)}</span>
                </div>
              </div>

              <div className="mt-8">
                <button
                  className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  onClick={() => setEditingProfile(true)}
                >
                  ✏️ Edit Profile
                </button>
              </div>

              {editingProfile && (
                <div className="mt-6 p-4 bg-muted rounded-lg border border-gray-300 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Edit Profile</h3>
                  {profileError && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                      {profileError}
                    </div>
                  )}
                  {profileSuccess && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                      {profileSuccess}
                    </div>
                  )}
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-primary-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-primary-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">Bio</label>
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-primary-500 focus:outline-none"
                        rows="3"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">Avatar URL</label>
                      <input
                        type="text"
                        name="avatar"
                        value={profileData.avatar}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-primary-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                      <button
                        type="button"
                        onClick={cancelProfileEdit}
                        className="w-full sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-muted transition-colors"
                      >
                        ❌ Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        disabled={profileUpdateLoading}
                      >
                        {profileUpdateLoading ? '⏳ Updating...' : '✅ Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
