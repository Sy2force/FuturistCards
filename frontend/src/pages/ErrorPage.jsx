import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPageSimple = () => {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Icône d'erreur */}
        <div className="mb-8">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {'pageNotFound'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {'pageNotFoundDescription'}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link 
            to="/" 
            className="block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {'backToHome'}
          </Link>
          
          <Link 
            to="/cards" 
            className="block bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {'viewCards'}
          </Link>
        </div>

        {/* Suggestions */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            {'popularPages'}
          </h3>
          <div className="space-y-2 text-sm">
            <Link to="/about" className="block text-blue-500 hover:text-blue-600">
              {'aboutCardPro'}
            </Link>
            <Link to="/login" className="block text-blue-500 hover:text-blue-600">
              {'signIn'}
            </Link>
            <Link to="/register" className="block text-blue-500 hover:text-blue-600">
              {'createAccount'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPageSimple;
