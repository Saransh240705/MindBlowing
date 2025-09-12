import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: true,
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOAD_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set auth token for all requests
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [state.token]);

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Set the token in axios headers
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          const response = await axios.get('http://localhost:5001/api/auth/me');
          
          dispatch({ 
            type: 'LOGIN_SUCCESS', 
            payload: {
              user: response.data.user,
              token: token
            }
          });
        } catch (error) {
          console.error('Error loading user:', error.response?.data || error.message);
          localStorage.removeItem('token');
          dispatch({ type: 'AUTH_ERROR' });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password,
      });
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.user,
          token: response.data.token,
        },
      });
      
      return { 
        success: true,
        user: response.data.user 
      };
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please check your credentials and try again.',
      };
    }
  };

  // Register function
  const register = async (firstName, lastName, email, password) => {
    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', {
        firstName,
        lastName,
        email,
        password
      });
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.user,
          token: response.data.token,
        },
      });
      return { 
        success: true,
        user: response.data.user 
      };
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed. Please try again with different credentials.',
      };
    }
  };

  // Google login function
  const googleLogin = async (googleToken) => {
    try {
      console.log('Attempting Google login with token');
      const response = await axios.post('http://localhost:5001/api/auth/google', {
        token: googleToken,
      });
      
      console.log('Google login successful');
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.user,
          token: response.data.token,
        },
      });
      return { 
        success: true,
        user: response.data.user 
      };
    } catch (error) {
      console.error('Google login error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Google login failed. Please try again later.',
      };
    }
  };

  // Handle successful Google login with user data
  const handleGoogleLogin = async (userData) => {
    try {
      console.log('Handling Google login success with user data', userData?.user?.email);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: userData.user,
          token: userData.token,
        },
      });
      return { 
        success: true,
        user: userData.user
      };
    } catch (error) {
      console.error('Google login handling error:', error);
      return {
        success: false,
        message: 'Failed to handle Google login. Please try again.',
      };
    }
  };

  // Logout function
  const logout = () => {
    console.log('Logging out user');
    dispatch({ type: 'LOGOUT' });
    console.log('User logged out successfully');
  };

  const value = {
    ...state,
    login,
    register,
    googleLogin,
    handleGoogleLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
