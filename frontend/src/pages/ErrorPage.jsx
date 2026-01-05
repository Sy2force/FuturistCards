import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  CreditCardIcon, 
  InformationCircleIcon,
  UserPlusIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const ErrorPage = () => {
  // Set document title
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="text-8xl mb-6">🌌</div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-300 text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 mb-8"
        >
          <Link 
            to="/" 
            className="group flex items-center justify-center bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Go Home
            <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            to="/cards" 
            className="group flex items-center justify-center glass-card text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10"
          >
            <CreditCardIcon className="w-5 h-5 mr-2" />
            View Cards
            <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="font-semibold text-white mb-4 flex items-center justify-center">
            <InformationCircleIcon className="w-5 h-5 mr-2" />
            Quick Links
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <Link 
              to="/about" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 rounded hover:bg-white/5"
            >
              About Us
            </Link>
            <Link 
              to="/login" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 rounded hover:bg-white/5"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 rounded hover:bg-white/5"
            >
              Register
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
