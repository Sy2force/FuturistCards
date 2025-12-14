import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null, allowedRoles = [], requireAuth = true }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Afficher un spinner pendant le chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  // Rediriger vers login si l'utilisateur n'est pas connecté
  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

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
  }

  // Afficher le composant si toutes les conditions sont remplies
  return children;
};

export default ProtectedRoute;
