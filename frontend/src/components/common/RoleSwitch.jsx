import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  BuildingStorefrontIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

const RoleSwitch = () => {
  const { user, login } = useAuth();

  const roles = [
    {
      name: 'user',
      label: 'Utilisateur',
      icon: UserIcon,
      color: 'from-green-400 to-blue-500',
      email: 'user@test.com'
    },
    {
      name: 'business',
      label: 'Business',
      icon: BuildingStorefrontIcon,
      color: 'from-blue-400 to-purple-500',
      email: 'business@test.com'
    },
    {
      name: 'admin',
      label: 'Admin',
      icon: ShieldCheckIcon,
      color: 'from-purple-400 to-red-500',
      email: 'admin@test.com'
    }
  ];

  const handleRoleChange = async (role) => {
    await login(role.email, 'password123');
    window.location.reload(); // Refresh pour appliquer les changements
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl"
      >
        <div className="text-xs font-medium text-gray-700 mb-3 text-center">
          Mode Test - Changer de rôle
        </div>
        <div className="flex space-x-2">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isActive = user?.role === role.name;
            
            return (
              <motion.button
                key={role.name}
                onClick={() => handleRoleChange(role)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-r ${role.color} text-white shadow-lg` 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <IconComponent className="h-5 w-5" />
                <div className="text-xs mt-1 font-medium">
                  {role.label}
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeRole"
                    className="absolute inset-0 rounded-xl ring-2 ring-white ring-opacity-60"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
        <div className="text-xs text-gray-500 mt-2 text-center">
          Rôle actuel: <span className="font-medium capitalize">{user?.role}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSwitch;
