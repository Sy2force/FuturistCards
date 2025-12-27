import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const ProfilePage = () => {
  const { user, loading, updateProfile } = useAuth();
  const { isDark } = useTheme();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    position: user?.position || '',
    website: user?.website || '',
    bio: user?.bio || ''
  });
  const [errors, setErrors] = useState({});
  
  const [userStats] = useState({
    totalCards: 3,
    totalLikes: 47,
    totalViews: 156,
    favoriteCards: 8
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.company || '',
        position: user.position || '',
        website: user.website || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      // Error handled
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      company: user?.company || '',
      position: user?.position || '',
      website: user?.website || '',
      bio: user?.bio || ''
    });
    setErrors({});
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Accès refusé
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Vous devez être connecté pour accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'business': return 'Professionnel';
      default: return 'Utilisateur';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-500';
      case 'business': return 'bg-blue-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className={`min-h-screen pt-24 pb-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`} data-testid="profile-page">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Mon Profil
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Gérez vos informations personnelles
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Mes Cartes</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {userStats.totalCards}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <span className="text-2xl">📇</span>
              </div>
            </div>
          </div>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Total Likes</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {userStats.totalLikes}
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <span className="text-2xl">❤️</span>
              </div>
            </div>
          </div>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Total Vues</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {userStats.totalViews}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <span className="text-2xl">👁️</span>
              </div>
            </div>
          </div>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Favoris</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {userStats.favoriteCards}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl overflow-hidden`}>
          {/* Header with gradient */}
          <div className={`h-32 ${
            user?.role === 'business' 
              ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700' 
              : user?.role === 'admin'
              ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700'
              : 'bg-gradient-to-r from-green-500 via-green-600 to-green-700'
          }`}></div>
          
          <div className="relative px-6 pb-6">
            {/* Profile Avatar */}
            <div className="relative -mt-16 mb-6">
              <div className={`w-32 h-32 rounded-full border-4 border-white ${isDark ? 'border-gray-800' : ''} flex items-center justify-center ${
                user?.role === 'business' 
                  ? 'bg-gradient-to-br from-blue-400 to-blue-600' 
                  : user?.role === 'admin'
                  ? 'bg-gradient-to-br from-purple-400 to-purple-600'
                  : 'bg-gradient-to-br from-green-400 to-green-600'
              }`}>
                <span className="text-white text-4xl font-bold">
                  {user?.firstName?.charAt(0) || 'U'}{user?.lastName?.charAt(0) || ''}
                </span>
              </div>
            </div>

            {/* User Info Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
              <div>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`} data-testid="profile-heading">
                  {user?.firstName || 'Prénom'} {user?.lastName || 'Nom'}
                </h1>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                  {user?.position || 'Poste'} {user?.company && `chez ${user.company}`}
                </p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${getRoleColor(user?.role)}`}>
                  {getRoleLabel(user?.role)}
                </span>
              </div>
              
              <button
                onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
                className={`flex items-center px-4 py-2 text-white rounded-lg transition-all duration-200 shadow-md ${getRoleColor(user?.role)} hover:opacity-90`}
              >
                {isEditing ? (
                  <>❌ Annuler</>
                ) : (
                  <>✏️ Modifier le profil</>
                )}
              </button>
            </div>

            {/* Edit Form or Display */}
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      👤 Prénom
                    </label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      type="text"
                      className={`w-full px-4 py-3 border ${errors.firstName ? 'border-red-500' : isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 transition-all`}
                      placeholder="Entrez votre prénom"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      👤 Nom
                    </label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      type="text"
                      className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 transition-all`}
                      placeholder="Entrez votre nom"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      📧 Email
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 transition-all`}
                      placeholder="Entrez votre email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      📱 Téléphone
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 transition-all`}
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      🏢 Entreprise
                    </label>
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      type="text"
                      className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 transition-all`}
                      placeholder="Entrez votre entreprise"
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      💼 Poste
                    </label>
                    <input
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      type="text"
                      className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 transition-all`}
                      placeholder="Entrez votre poste"
                    />
                  </div>

                  {/* Website */}
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      🌐 Site web
                    </label>
                    <input
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      type="url"
                      className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 transition-all`}
                      placeholder="https://votre-site.com"
                    />
                  </div>

                  {/* Bio */}
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      📝 À propos de vous
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 transition-all resize-none`}
                      placeholder="Parlez-nous de vous..."
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className={`px-6 py-3 border ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} rounded-lg transition-all`}
                    disabled={isLoading}
                  >
                    ❌ Annuler
                  </button>
                  <button
                    type="submit"
                    className={`px-6 py-3 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md ${getRoleColor(user?.role)} hover:opacity-90`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                        Enregistrement...
                      </>
                    ) : (
                      <>✅ Enregistrer</>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Profile Display */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
                    📧 Informations de Contact
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-400">📧</span>
                      <div>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</span>
                        <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>{user?.email}</p>
                      </div>
                    </div>
                    {user?.phone && (
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-400">📱</span>
                        <div>
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Téléphone</span>
                          <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>{user.phone}</p>
                        </div>
                      </div>
                    )}
                    {user?.website && (
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-400">🌐</span>
                        <div>
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Site web</span>
                          <a 
                            href={user.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                          >
                            {user.website}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {(user?.company || user?.position) && (
                  <div>
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
                      🏢 Informations Professionnelles
                    </h3>
                    <div className="space-y-4">
                      {user?.company && (
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-400">🏢</span>
                          <div>
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Entreprise</span>
                            <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>{user.company}</p>
                          </div>
                        </div>
                      )}
                      {user?.position && (
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-400">💼</span>
                          <div>
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Poste</span>
                            <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>{user.position}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {user?.bio && (
                  <div className="md:col-span-2">
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                      📝 À propos
                    </h3>
                    <p className={`${isDark ? 'text-gray-300 bg-gray-700' : 'text-gray-700 bg-gray-50'} leading-relaxed p-4 rounded-lg`}>
                      {user.bio}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
