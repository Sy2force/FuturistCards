import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';
import GlassContainer from './GlassContainer';

const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  requireBusiness = false, 
  requireAdmin = false,
  redirectTo = '/login'
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Checking authentication..." />
      </div>
    );
  }

  // Check if authentication is required
  if (requireAuth && !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check if user should not be authenticated (for login/register pages)
  if (!requireAuth && user) {
    return <Navigate to="/" replace />;
  }

  // Check business user requirement
  if (requireBusiness && (!user || !user.isBusiness)) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <GlassContainer className="text-center max-w-md">
          <div className="text-yellow-400 mb-4">🏢</div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Business Account Required
          </h2>
          <p className="text-white/70 mb-6">
            You need a business account to access this feature. 
            Contact support to upgrade your account.
          </p>
        </GlassContainer>
      </div>
    );
  }

  // Check admin requirement
  if (requireAdmin && (!user || user.role !== 'admin')) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <GlassContainer className="text-center max-w-md">
          <div className="text-red-400 mb-4">🚫</div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Admin Access Required
          </h2>
          <p className="text-white/70 mb-6">
            You need administrator privileges to access this page.
          </p>
        </GlassContainer>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
