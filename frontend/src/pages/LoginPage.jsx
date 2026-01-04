import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRoleTheme } from '../context/ThemeProvider';
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearError, user, getRedirectPath } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(getRedirectPath(user.role), { replace: true });
    }
  }, [user, navigate, getRedirectPath]);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [validationError, setValidationError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    clearError();
    setValidationError('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setValidationError('All fields are required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError('Invalid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSuccess('');
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          navigate(getRedirectPath(result.user.role));
        }, 1500);
      }
    } catch (err) {
      // Error handled by AuthContext
    }
  };

  const displayError = validationError || error;

  return (
    <>
      <Helmet>
        <title>Login | FuturistCards</title>
        <meta name="description" content="Login to your FuturistCards account to access your digital business cards" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex pt-16" data-testid="login-page">
      {/* Left side - Form */}
      <div className="w-full lg:w-3/4 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="mx-auto w-full max-w-md lg:max-w-lg xl:max-w-xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4 animate-float">
              Login
            </h2>
            <p className="text-lg text-indigo-200">
              Welcome back! Please login to your account
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
            {displayError && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg backdrop-blur-sm">
                <p className="text-sm text-red-200 font-medium">{displayError}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg backdrop-blur-sm">
                <p className="text-sm text-green-200 font-medium">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-testid="login-form">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  placeholder="Enter your email"
                  required
                  data-testid="login-email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  placeholder="Enter your password"
                  required
                  data-testid="login-password"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                  disabled={loading}
                  data-testid="submit-button"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-white/80">
                Don't have an account? {' '}
                <Link 
                  to="/register" 
                  className="font-medium text-blue-300 hover:text-blue-200 transition-colors"
                  data-testid="register-link"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Inspiring Image with Wave Effect */}
      <div className="hidden lg:block relative w-1/4 h-screen overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/25 to-cyan-600/20 backdrop-blur-sm animate-pulse"></div>
        
        {/* Main image with enhanced effects */}
        <div className="absolute inset-0 transform hover:scale-105 transition-all duration-700 ease-out">
          <img 
            src="/images/login-hero.jpg" 
            alt="Login hero image"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="h-full w-full bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 opacity-90" style={{display: 'none'}}></div>
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Enhanced gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/15 to-purple-500/25"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-24 right-12 w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
          <div className="absolute top-44 left-14 w-1 h-1 bg-cyan-300/80 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
          <div className="absolute bottom-28 right-18 w-1.5 h-1.5 bg-purple-300/70 rounded-full animate-bounce" style={{animationDelay: '2.5s', animationDuration: '5.5s'}}></div>
        </div>
        
        {/* Content with enhanced styling */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
          <div className="text-white transform hover:translate-y-[-2px] transition-all duration-300">
            <h3 className="text-xl lg:text-2xl font-bold mb-3 text-white drop-shadow-lg">
              Welcome to the Future
            </h3>
            <p className="text-sm lg:text-base text-white/95 leading-relaxed backdrop-blur-sm bg-black/20 rounded-lg p-3 border border-white/20">
              Create and manage your digital business cards with cutting-edge technology
            </p>
          </div>
        </div>
        
        {/* Border accent */}
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-cyan-400/60 via-purple-400/40 to-transparent"></div>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
