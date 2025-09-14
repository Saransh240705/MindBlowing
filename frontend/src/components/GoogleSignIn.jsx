import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleSignIn = ({ onSuccess, onError }) => {
  const handleGoogleSignIn = (credentialResponse) => {
    try {
      // Pass the credential to the parent component
      onSuccess(credentialResponse);
    } catch (error) {
      console.error('Google sign-in error:', error);
      onError(error.message || 'Google sign-in failed');
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
