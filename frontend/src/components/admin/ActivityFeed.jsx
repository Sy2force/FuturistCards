import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserIcon, 
  CreditCardIcon, 
  HeartIcon,
  EyeIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

const ActivityFeed = ({ activities, isConnected }) => {
  const getActivityIcon = (type) => {
    const iconProps = { className: "w-5 h-5" };
    
    switch (type) {
      case 'user_registered':
        return <UserIcon {...iconProps} className="w-5 h-5 text-green-400" />;
      case 'card_created':
        return <CreditCardIcon {...iconProps} className="w-5 h-5 text-blue-400" />;
      case 'card_liked':
        return <HeartIcon {...iconProps} className="w-5 h-5 text-red-400" />;
      case 'card_viewed':
        return <EyeIcon {...iconProps} className="w-5 h-5 text-purple-400" />;
      default:
        return <ClockIcon {...iconProps} className="w-5 h-5 text-gray-400" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'user_registered':
        return 'border-green-400/30 bg-green-400/10';
      case 'card_created':
        return 'border-blue-400/30 bg-blue-400/10';
      case 'card_liked':
        return 'border-red-400/30 bg-red-400/10';
      case 'card_viewed':
        return 'border-purple-400/30 bg-purple-400/10';
      default:
        return 'border-gray-400/30 bg-gray-400/10';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return time.toLocaleDateString('en-US');
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Recent Activity</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
          <span className="text-sm text-gray-400">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${getActivityColor(activity.type)} backdrop-blur-sm`}
            >
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="flex-shrink-0 p-2 rounded-full bg-black/20">
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">
                    {activity.message}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">
                      {activity.user}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTime(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {activities.length === 0 && (
          <div className="text-center py-8">
            <ClockIcon className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
