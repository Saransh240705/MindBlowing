import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { API } from '../config/api';

const GoogleSignIn = ({ onSuccess, onError }) => {
  const handleGoogleSignIn = async (credentialResponse) => {
    try {
      const response = await fetch(`${API.BASE_URL}/auth/google`, {
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
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleGoogleSignIn}
        onError={() => onError('Google sign-in failed')}
        theme="filled_black"
        size="large"
        width="100%"
      />
    </div>
  );
};

export default GoogleSignIn;
