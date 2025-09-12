import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { API } from '../config/api';

const GoogleSignIn = ({ onSuccess, onError }) => {
  const handleGoogleSignIn = async (credentialResponse) => {
    try {
      console.log('🔑 Attempting Google sign-in with:', API.BASE_URL);
      
      const response = await fetch(`${API.BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onSuccess(data);
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      onError(error.message);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <GoogleLogin
        onSuccess={handleGoogleSignIn}
        onError={() => onError('Google sign-in failed')}
        theme="filled_black"
        size="large"
        shape="rectangular"
        width={320}
      />
    </div>
  );
};

export default GoogleSignIn;
