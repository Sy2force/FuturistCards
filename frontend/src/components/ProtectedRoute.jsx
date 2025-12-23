import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, role, allowedRoles, requireAuth = true, requireBusiness = false, requireAdmin = false }) => {
  const { user, loading } = useAuth();

  // OBLIGATOIRE: Aucune redirection tant que loading === true
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="auth-loading">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Si requireAuth === false (pour login/register), permettre l'accès sans auth
  if (requireAuth === false) {
    // Si déjà connecté, rediriger vers /cards
    if (user) {
      return <Navigate to="/cards" replace />;
    }
    return children;
  }

  // Redirection uniquement après loading === false
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check business requirement
  if (requireBusiness && !['business', 'admin'].includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check admin requirement
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check single role
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check multiple allowed roles
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
