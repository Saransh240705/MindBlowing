import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleSignIn = ({ onSuccess, onError, buttonText = "Sign in with Google" }) => {
  const handleGoogleSignIn = (credentialResponse) => {
    try {
      // Pass the credential to the parent component
      onSuccess(credentialResponse);
    } catch (error) {
      console.error('Google sign-in error:', error);
      onError(error.message || 'Google sign-in failed');
    }
  };

  // Check if Google Client ID is configured
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  
  if (!googleClientId || googleClientId === 'your-google-client-id-here') {
    return (
      <div className="w-full max-w-sm mx-auto">
        <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Google Sign-In is not configured. Please set up REACT_APP_GOOGLE_CLIENT_ID in your environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <GoogleLogin
        onSuccess={handleGoogleSignIn}
        onError={() => onError('Google sign-in failed')}
        theme="filled_black"
        size="large"
        shape="rectangular"
        width={320}
        text={buttonText}
      />
    </div>
  );
};

export default GoogleSignIn;
