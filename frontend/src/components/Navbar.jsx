import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAvatarClick = () => {
    navigate('/dashboard');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-gray-900 dark:text-white text-xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              MindBloging
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/create" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative group"
                >
                  Create Post
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
                </Link>
                <Link 
                  to="/manage" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative group"
                >
                  My Posts
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
                </Link>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleAvatarClick}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 hover:scale-105 overflow-hidden bg-blue-600"
                    title="Go to Dashboard"
                  >
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-semibold text-sm">
                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                      </div>
                    )}
                  </button>
                  
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    Hello, {user?.firstName}
                  </span>
                  
                  <button 
                    onClick={handleLogout} 
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
