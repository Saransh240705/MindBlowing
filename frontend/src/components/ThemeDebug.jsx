import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

const ThemeDebug = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="fixed top-20 right-4 z-50 p-4 bg-white dark:bg-gray-800 border-2 border-red-500 dark:border-red-400 rounded-lg shadow-xl">
      <div className="text-sm space-y-2">
        <div className="font-bold text-red-600 dark:text-red-400">THEME DEBUG</div>
        <div>Current Theme: <span className="font-mono bg-yellow-200 dark:bg-yellow-700 px-1">{theme}</span></div>
        <div>HTML Class: <span className="font-mono bg-yellow-200 dark:bg-yellow-700 px-1">{document.documentElement.className}</span></div>
        <button 
          onClick={toggleTheme}
          className="w-full px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default ThemeDebug;
