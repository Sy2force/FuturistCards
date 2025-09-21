import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Navbar from './Navbar';
import Footer from './Footer';
import RoleSwitch from '../common/RoleSwitch';
import { Toaster } from 'react-hot-toast';

// Layout principal avec thèmes ultra-lisibles
const MainLayout = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen font-inter transition-all duration-300 ${
      isDark 
        ? 'bg-darkBg text-darkText' 
        : 'bg-lightBg text-lightText'
    }`}>
      {/* Navigation globale */}
      <Navbar />
      
      {/* Zone de contenu principale - les pages s'affichent ici */}
      <main className="pt-16">
        <Outlet />
      </main>
      
      {/* Pied de page global */}
      <Footer />
      
      {/* Composants globaux */}
      <RoleSwitch />
      
      {/* Notifications toast avec thème ultra-lisible */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            color: isDark ? '#ffffff' : '#1A202C',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(26, 32, 44, 0.1)'}`,
            borderRadius: '12px',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: '500',
          },
        }}
      />
    </div>
  );
};

export default MainLayout;
