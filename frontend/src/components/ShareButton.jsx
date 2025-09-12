import React, { useState } from 'react';

const ShareButton = ({ url, title, description }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const currentUrl = url || window.location.href;
  const shareTitle = title || document.title;
  const shareDescription = description || '';

  const shareOptions = [
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + currentUrl)}`
    },
    {
      name: 'Email',
      icon: '📧',
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareDescription + '\n\n' + currentUrl)}`
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleShare = (option) => {
    window.open(option.url, '_blank', 'noopener,noreferrer');
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block">
      <button 
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
        onClick={() => setShowDropdown(!showDropdown)}
        aria-label="Share post"
      >
        <span className="text-base">📤</span>
        Share
      </button>
      
      {showDropdown && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowDropdown(false)}
          ></div>
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <h4 className="text-base font-semibold text-gray-900 dark:text-white">Share this post</h4>
              <button 
                className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                ×
              </button>
            </div>
            
            <div className="p-2">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => handleShare(option)}
                >
                  <span className="text-lg w-5 text-center">{option.icon}</span>
                  {option.name}
                </button>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentUrl}
                  readOnly
                  className="flex-1 px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-gray-600 dark:text-gray-400"
                />
                <button
                  className={`px-3 py-2 text-xs font-medium rounded transition-all duration-200 ${
                    copySuccess 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  onClick={copyToClipboard}
                >
                  {copySuccess ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;
