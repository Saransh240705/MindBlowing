import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import GoogleSignIn from '../components/GoogleSignIn.jsx';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register, handleGoogleLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Create a username from email (required by backend)
      const username = formData.email.split('@')[0];
      
      const userData = {
        username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      };
      
      const result = await register(userData);
      
      if (result && result.token) {
        navigate('/');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again with different credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (data) => {
    try {
      const result = await handleGoogleLogin(data);
      if (result && result.token) {
        navigate('/');
      } else {
        setError('Failed to complete Google authentication');
      }
    } catch (error) {
      setError(error.message || 'Failed to complete Google authentication');
    }
  };

  const handleGoogleError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left side - Content/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white p-12 relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-20">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-wide">MindBlogging</h1>
          </div>
          
          {/* Main Content */}
          <div className="my-auto">
            <h2 className="text-4xl font-extrabold mb-6">A sophisticated platform for thoughtful writers and discerning readers.</h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">Join our community of creators and share your unique perspective with the world.</p>
            
            {/* Illustration */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <div className="relative flex items-center space-x-3">
                  <svg className="w-16 h-16 text-purple-300/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.71,4.63L19.37,3.29C19.19,3.11 18.94,3 18.67,3H18.66C18.39,3 18.14,3.11 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,4.92 20.71,4.63Z"></path>
                    <path d="M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19.42 1.58,19.91L2,22L4.9,21.34C6.33,21.89 8.28,22.12 10,21.09C12.35,19.74 12.77,16.53 10.71,14.47C9.66,13.42 8.05,13.42 7,14Z"></path>
                  </svg>
                  <svg className="w-12 h-12 text-indigo-300/90 transform translate-y-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4,2H20A2,2 0 0,1 22,4V22L17,17H4A2,2 0 0,1 2,15V4A2,2 0 0,1 4,2M6,9H18V11H6M6,13H16V15H6M6,7H18V8H6V7Z"></path>
                  </svg>
                  <svg className="w-14 h-14 text-purple-300/80 transform translate-y-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20,11H4V8H20M20,15H13V13H20M20,19H13V17H20M11,19H4V13H11M20.33,4.67L18.67,3L17,4.67L15.33,3L13.67,4.67L12,3L10.33,4.67L8.67,3L7,4.67L5.33,3L3.67,4.67L2,3V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V3L20.33,4.67Z"></path>
                  </svg>
                </div>
                
                {/* Animated line */}
                <div className="absolute top-10 left-0 w-full">
                  <svg width="100%" height="30" viewBox="0 0 200 30" fill="none">
                    <path
                      d="M0 15C50 -5 150 35 200 15"
                      stroke="rgba(139, 92, 246, 0.5)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="5 5"
                      strokeDashoffset="0"
                      className="animate-dash"
                    />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Quote */}
            <blockquote className="relative mt-12">
              <svg className="w-12 h-12 text-indigo-400/30 absolute -top-6 -left-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z"></path>
              </svg>
              <p className="text-xl italic relative z-10 mb-2">
                "Write freely, without fear. Your authentic voice is your greatest strength."
              </p>
              <cite className="text-sm text-white/70">— MindBlogging Philosophy</cite>
            </blockquote>
          </div>
          
          {/* Footer */}
          <div className="mt-auto text-sm text-white/60">
            <p>© 2025 MindBlogging. All rights reserved.</p>
          </div>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo - only visible on small screens */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h1 className="text-xl ml-3 font-bold tracking-wide text-gray-900 dark:text-white">MindBlogging</h1>
          </div>
          
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">Create an account</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
              Join our community of writers and readers
            </p>
          </div>
          
          {/* Error Alert */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 rounded-r-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-700 dark:text-red-300 text-sm font-medium">{error}</span>
              </div>
            </div>
          )}
          
          {/* Tabs */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <div className="w-1/2 text-center py-3">
              <Link to="/login" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm transition-colors">
                Sign In
              </Link>
            </div>
            <div className="w-1/2 relative">
              <div className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-sm transform transition-all duration-200"></div>
              <div className="relative text-center py-3">
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">Sign Up</span>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <div className="group">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="johndoe@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            
            <div className="group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                  minLength="8"
                />
              </div>
            </div>
            
            <div className="group">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                  minLength="8"
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors"
                required
              />
              <label htmlFor="agree-terms" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                I agree to the <button type="button" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Terms of Service</button> and <button type="button" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">Privacy Policy</button>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200"
            >
              {loading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          
          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-medium">
                OR SIGN UP WITH
              </span>
            </div>
          </div>
          
          {/* Social Login */}
          <div>
            <GoogleSignIn 
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>
          
          {/* Already have account */}
          <div className="text-center text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
