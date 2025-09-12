import React, { useEffect, useRef } from 'react';

const GoogleSignIn = ({ onSuccess, onError }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleCredentialResponse = async (response) => {
      try {
        const result = await fetch('http://localhost:5001/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: response.credential,
          }),
        });

        const data = await result.json();

        if (result.ok) {
          if (onSuccess) {
            onSuccess(data);
          }
        } else {
          console.error('Google authentication failed:', data);
          if (onError) {
            onError(data.message || 'Google sign-in failed');
          }
        }
      } catch (error) {
        console.error('Google sign-in error:', error);
        if (onError) {
          onError('Google sign-in failed');
        }
      }
    };

    const initializeGoogleSignIn = () => {
      const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
      
      if (!clientId) {
        console.error('Google Client ID is not set in environment variables');
        if (onError) {
          onError('Google Client ID is not configured. Please contact support.');
        }
        return;
      }
      
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        if (buttonRef.current) {
          window.google.accounts.id.renderButton(buttonRef.current, {
            theme: 'outline',
            size: 'large',
            width: '100%',
            text: 'signin_with',
            shape: 'rectangular',
          });
        } else {
          console.error('Button reference is null');
        }
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
        if (onError) {
          onError('Failed to initialize Google Sign-In');
        }
      }
    };

    if (window.google) {
      initializeGoogleSignIn();
    } else {
      const checkGoogle = setInterval(() => {
        if (window.google) {
          clearInterval(checkGoogle);
          initializeGoogleSignIn();
        }
      }, 100);
      
      setTimeout(() => {
        if (!window.google) {
          console.error('Google API failed to load after 10 seconds');
          clearInterval(checkGoogle);
          if (onError) {
            onError('Google API failed to load. Please check your internet connection and try again.');
          }
        }
      }, 10000);
    }
  }, [onSuccess, onError]);

  return (
    <div className="w-full">
      <div ref={buttonRef} className="w-full flex justify-center"></div>
    </div>
  );
};

export default GoogleSignIn;
