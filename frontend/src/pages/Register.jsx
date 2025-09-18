import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'requis';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'Minimum 2 caractères';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'requis';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Minimum 2 caractères';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'requis';
    }
    
    if (!formData.password) {
      newErrors.password = 'requis';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mots de passe différents';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs');
      return;
    }
    
    try {
      const userData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        role: formData.role
      };
      
      await register(userData);
      navigate('/');
    } catch (error) {
      // console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-2">
            Inscription
          </h1>
          <p className="text-white/70">Créez votre compte FuturistCards</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Prénom
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                placeholder="Prénom"
                required
              />
              {errors.firstName && (
                <span className="text-red-400 text-sm mt-1" data-testid="error-requis">
                  {errors.firstName}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Nom
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                placeholder="Nom"
                required
              />
              {errors.lastName && (
                <span className="text-red-400 text-sm mt-1" data-testid="error-requis">
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
              placeholder="votre@email.com"
              required
            />
            {errors.email && (
              <span className="text-red-400 text-sm mt-1" data-testid="error-requis">
                {errors.email}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
              placeholder="Mot de passe"
              required
            />
            {errors.password && (
              <span className="text-red-400 text-sm mt-1" data-testid="error-requis">
                {errors.password}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
              placeholder="Confirmer le mot de passe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Type de compte
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
              required
            >
              <option value="user" className="bg-gray-800 text-white">User</option>
              <option value="business" className="bg-gray-800 text-white">Entreprise</option>
            </select>
            {errors.role && (
              <span className="text-red-400 text-sm mt-1" data-testid="error-requis">
                {errors.role}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500/30 hover:bg-green-500/40 border border-green-500/50 rounded-lg px-6 py-3 text-white font-medium transition-all duration-300 hover:scale-105"
          >
            S'inscrire
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/60">
            Don&apos;t have an account?{' '}
            <Link 
              to="/login" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Se connecter
            </Link>
          </p>
          <Link 
            to="/" 
            className="inline-block mt-4 text-white/60 hover:text-white/80 transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
