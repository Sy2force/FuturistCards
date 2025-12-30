import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRoleTheme } from '../context/ThemeProvider';
import { motion } from 'framer-motion';

const ProtectedRoute = ({ children, requiredRole = null, requiredRoles = null }) => {
  const { user, loading } = useAuth();
  const { currentTheme } = useRoleTheme();
  
  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: currentTheme.colors.background }}
      >
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-16 h-16 border-4 border-t-transparent rounded-full"
            style={{ borderColor: currentTheme.colors.primary }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            data-testid="loading-spinner"
          />
          <motion.p 
            className="text-lg font-medium"
            style={{ color: currentTheme.colors.text.secondary }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            טוען...
          </motion.p>
        </motion.div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check single role
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check multiple roles
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
