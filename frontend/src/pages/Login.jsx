import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import GoogleSignIn from '../components/GoogleSignIn.jsx';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, handleGoogleLogin } = useAuth();
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
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password, rememberMe);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || 'Failed to login');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const result = await handleGoogleLogin(credentialResponse);
      if (result.success) {
        navigate('/');
      } else {
        console.error('Google login failed:', result.message);
        setError(result.message || 'Failed to login with Google');
      }
    } catch (err) {
      console.error('Google login error:', err);
      setError('Failed to login with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = (errorMessage) => {
    setError(errorMessage || 'Google login failed');
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
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
            <h2 className="text-4xl font-extrabold mb-6">Welcome back to your writing journey.</h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">Sign in to continue sharing your ideas and connecting with our community of readers.</p>
            
            {/* Illustration */}
            <div className="flex justify-center mb-12">
              <svg className="w-full max-w-sm h-auto opacity-80" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M156.878 94.4892C157.313 94.0543 157.716 93.6008 158.12 93.1473C170.568 79.0061 183.016 64.8649 195.464 50.7236C196.753 49.261 198.214 48.1152 199.847 47.4626C204.034 45.7805 208.279 47.5 210.221 51.4499C211.279 53.6305 211.54 55.9849 211.57 58.3392C211.656 64.2505 211.599 70.1618 211.599 76.0731C211.599 77.0094 211.599 77.9458 211.599 79.0341C212.087 79.0341 212.462 79.0341 212.866 79.0341C227.833 79.0341 242.828 79.0341 257.795 79.0628C262.303 79.0628 265.261 81.9779 265.492 86.4475C265.636 89.2487 264.983 91.7457 262.911 93.6008C262.216 94.2247 261.465 94.7926 260.684 95.3605C241.192 109.155 221.73 122.979 202.238 136.774C194.001 142.483 185.733 148.192 177.496 153.871C175.337 155.353 172.958 156.29 170.28 156.29C167.601 156.29 165.222 155.353 163.063 153.871C144.574 141.661 126.055 129.45 107.566 117.239C101.553 113.316 95.5407 109.424 89.5281 105.501C89.0084 105.164 88.5175 104.798 88.0265 104.461" 
                  stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round"/>
                <path d="M338.887 122.863C327.069 122.863 315.25 122.863 303.431 122.863C299.767 122.863 296.979 120.133 296.979 116.527C296.979 112.922 299.767 110.191 303.431 110.191C326.952 110.191 350.473 110.191 373.993 110.191C377.657 110.191 380.445 112.922 380.445 116.527C380.445 120.133 377.657 122.863 373.993 122.863C362.291 122.863 350.589 122.863 338.887 122.863Z" fill="url(#paint1_linear)" />
                <path d="M338.797 165.666C327.095 165.666 315.365 165.666 303.663 165.666C299.999 165.666 297.212 162.935 297.212 159.358C297.212 155.752 299.999 153.021 303.663 153.021C327.184 153.021 350.705 153.021 374.225 153.021C377.889 153.021 380.677 155.752 380.677 159.358C380.677 162.935 377.889 165.666 374.225 165.666C362.407 165.666 350.588 165.666 338.797 165.666Z" fill="url(#paint2_linear)" />
                <path d="M339.144 208.498C350.472 208.498 361.801 208.498 373.13 208.498C376.91 208.498 379.814 211.258 379.757 214.934C379.698 218.54 376.794 221.242 373.014 221.242C349.493 221.242 325.973 221.242 302.452 221.242C298.672 221.242 295.768 218.54 295.768 214.934C295.768 211.258 298.643 208.498 302.452 208.498C314.665 208.498 326.877 208.498 339.144 208.498Z" fill="url(#paint3_linear)" />
                <path d="M339.174 79.9966C350.386 79.9966 361.598 79.9966 372.81 79.9966C376.648 79.9966 379.611 82.7273 379.553 86.3037C379.495 89.9095 376.474 92.5542 372.636 92.5542C349.232 92.5542 325.856 92.5542 302.452 92.5542C298.614 92.5542 295.622 89.9095 295.564 86.3037C295.506 82.6979 298.469 79.9966 302.307 79.9966C314.596 79.9966 326.877 79.9966 339.174 79.9966Z" fill="url(#paint4_linear)" />
                <defs>
                  <linearGradient id="paint0_linear" x1="76.7584" y1="121.765" x2="265.538" y2="121.765" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1" />
                    <stop offset="0.5" stopColor="#9333EA" />
                    <stop offset="1" stopColor="#6366F1" />
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="296.979" y1="116.527" x2="380.445" y2="116.527" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1" />
                    <stop offset="0.5" stopColor="#9333EA" />
                    <stop offset="1" stopColor="#6366F1" />
                  </linearGradient>
                  <linearGradient id="paint2_linear" x1="297.212" y1="159.344" x2="380.677" y2="159.344" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1" />
                    <stop offset="0.5" stopColor="#9333EA" />
                    <stop offset="1" stopColor="#6366F1" />
                  </linearGradient>
                  <linearGradient id="paint3_linear" x1="295.768" y1="214.87" x2="379.757" y2="214.87" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1" />
                    <stop offset="0.5" stopColor="#9333EA" />
                    <stop offset="1" stopColor="#6366F1" />
                  </linearGradient>
                  <linearGradient id="paint4_linear" x1="295.564" y1="86.2754" x2="379.553" y2="86.2754" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1" />
                    <stop offset="0.5" stopColor="#9333EA" />
                    <stop offset="1" stopColor="#6366F1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Feature highlight */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="h-12 w-12 rounded-full bg-indigo-500/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Secure Login</h3>
                <p className="text-white/70">Your data is protected with the latest security standards</p>
              </div>
            </div>
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
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
              Sign in to continue to your account
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
            <div className="w-1/2 relative">
              <div className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-sm transform transition-all duration-200"></div>
              <div className="relative text-center py-3">
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">Sign In</span>
              </div>
            </div>
            <div className="w-1/2 text-center py-3">
              <Link to="/register" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="name@example.com"
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
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <button 
                  type="button" 
                  className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Forgot password?
                </button>
              </div>
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
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          
          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-medium">
                OR SIGN IN WITH
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
          
          {/* Create account link */}
          <div className="text-center text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
