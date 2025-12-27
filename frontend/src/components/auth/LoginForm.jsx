import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePassword, isFormValid } from '../../utils/validation';

const LoginForm = ({ onSuccess }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      if (onSuccess) onSuccess();
    } catch (error) {
      setErrors({ general: error.message || 'Erreur de connexion' });
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = () => {
    setFormData({
      email: 'business@demo.com',
      password: 'Demo1234!'
    });
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      data-testid="login-form"
    >
      {errors.general && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm">
          {errors.general}
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-white/5 border ${
            errors.email ? 'border-red-500' : 'border-gray-600'
          } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
          placeholder="votre@email.com"
          disabled={loading}
          data-testid="login-email"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Mot de passe
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-white/5 border ${
              errors.password ? 'border-red-500' : 'border-gray-600'
            } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 pr-12`}
            placeholder="••••••••"
            disabled={loading}
            data-testid="login-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            disabled={loading}
          >
            <span className="text-lg">
              {showPassword ? '🙈' : '👁️'}
            </span>
          </button>
        </div>
        {errors.password && (
          <p className="text-red-400 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* Demo Account */}
      <div className="text-center">
        <button
          type="button"
          onClick={fillDemoAccount}
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          disabled={loading}
          data-testid="demo-account-button"
        >
          🎯 Utiliser le compte démo business
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !isFormValid(errors, formData, ['email', 'password'])}
        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
        data-testid="login-submit"
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          'Se connecter'
        )}
      </button>
    </form>
  );
};

export default LoginForm;
