import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { API } from '../config/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        user: action.payload.user, 
        token: action.payload.token,
        isAuthenticated: true,
        error: null 
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        loading: false, 
        error: action.payload, 
        isAuthenticated: false,
        user: null,
        token: null 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        token: null, 
        isAuthenticated: false,
        loading: false,
        error: null 
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token,
          user: JSON.parse(user),
        },
      });
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const apiUrl = `${API.BASE_URL}/api/auth/login`;
      console.log('🔑 Attempting login to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('📡 Login response status:', response.status);

      const data = await response.json();
      console.log('📡 Login response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: data,
      });

      return data;
    } catch (error) {
      console.error('❌ Login error:', error);
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message,
      });
      throw error;
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const apiUrl = `${API.BASE_URL}/api/auth/register`;
      console.log('📝 Attempting registration to:', apiUrl);
      console.log('📝 Registration data:', userData);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('📡 Registration response status:', response.status);
      
      const data = await response.json();
      console.log('📡 Registration response data:', data);

      if (!response.ok) {
        throw new Error(data.message || `Registration failed with status ${response.status}`);
      }

      // Ensure we have token and user data
      if (!data.token || !data.user) {
        throw new Error('Invalid response from server');
      }

      // Store authentication data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: data.token,
          user: data.user
        },
      });

      // Add a success flag for compatibility with the Register component
      return { ...data, success: true };
    } catch (error) {
      console.error('❌ Registration error:', error);
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message,
      });
      return { success: false, message: error.message };
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const apiUrl = `${API.BASE_URL}${API.ENDPOINTS.GOOGLE_AUTH}`;
      console.log('🔑 Attempting Google login to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      console.log('📡 Google login response status:', response.status);

      const data = await response.json();
      console.log('📡 Google login response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Google login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: data,
      });

      return data;
    } catch (error) {
      console.error('❌ Google login error:', error);
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message,
      });
      throw error;
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        handleGoogleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export AuthContext for backward compatibility
export { AuthContext };
export default AuthContext;
