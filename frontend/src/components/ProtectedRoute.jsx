<<<<<<< HEAD
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null, allowedRoles = [], requireAuth = true }) => {
=======
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, role, allowedRoles, requireAuth = true, requireBusiness = false, requireAdmin = false }) => {
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
  const { user, loading } = useAuth();

  // Si requireAuth === false (pour login/register et pages publiques), permettre l'accès sans auth
  if (requireAuth === false) {
    // Pour les pages login/register, rediriger si déjà connecté
    if (user && (window.location.pathname === '/login' || window.location.pathname === '/register')) {
      return <Navigate to="/cards" replace />;
    }
    // Pour toutes les autres pages avec requireAuth=false, permettre l'accès libre même pendant loading
    return children;
  }

  // OBLIGATOIRE: Aucune redirection tant que loading === true
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="auth-loading">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirection uniquement après loading === false
  if (!user) {
    return <Navigate to="/login" replace />;
  }

<<<<<<< HEAD
  // Vérifier les rôles autorisés
  if (user && (requiredRole || allowedRoles.length > 0)) {
    const hasRequiredRole = requiredRole ? user.role === requiredRole : true;
    const hasAllowedRole = allowedRoles.length > 0 ? allowedRoles.includes(user.role) : true;
    
    if (!hasRequiredRole || !hasAllowedRole) {
      // Redirection intelligente selon le rôle
      if (user.role === 'admin') {
        return <Navigate to="/admin" replace />;
      } else if (user.role === 'business') {
        return <Navigate to="/my-cards" replace />;
      } else {
        return <Navigate to="/cards" replace />;
      }
    }
=======
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
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
  }

  return children;
};

export default ProtectedRoute;
