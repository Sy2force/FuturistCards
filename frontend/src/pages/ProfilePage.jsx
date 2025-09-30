import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { UserCircleIcon, CameraIcon, PencilIcon } from '@heroicons/react/24/outline';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    position: user?.position || '',
    bio: user?.bio || '',
    website: user?.website || '',
    profileImage: user?.profileImage || null
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profileImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error('Profile save error:', error);
    }
  };

  const handleCancel = () => {
    setProfileData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      company: user?.company || '',
      position: user?.position || '',
      bio: user?.bio || '',
      website: user?.website || '',
      profileImage: user?.profileImage || null
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('accessDenied')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('mustBeLoggedIn')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
          
          <div className="relative px-6 pb-6">
            {/* Photo de profil */}
            <div className="relative -mt-16 mb-4">
              <div className="relative inline-block">
                {profileData.profileImage ? (
                  <img
                    src={profileData.profileImage}
                    alt={t('profileImageAlt')}
                    className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                  />
                ) : (
                  <UserCircleIcon className="w-32 h-32 text-gray-400 bg-white dark:bg-gray-800 rounded-full border-4 border-white dark:border-gray-800" />
                )}
                
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer">
                    <CameraIcon className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Informations utilisateur */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {profileData.firstName} {profileData.lastName}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {profileData.position} {profileData.company && `chez ${profileData.company}`}
                </p>
                <div className="mt-2">
                  <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    user.role === 'business' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {user.role === 'admin' ? t('administrator') : 
                     user.role === 'business' ? t('business') : t('user')}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <PencilIcon className="w-4 h-4 mr-2" />
                {isEditing ? t('cancel') : t('edit')}
              </button>
            </div>

            {/* Formulaire d'édition */}
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('firstName')}
                  </label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('lastName')}
                  </label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('phone')}
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('company')}
                  </label>
                  <input
                    type="text"
                    value={profileData.company}
                    onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('position')}
                  </label>
                  <input
                    type="text"
                    value={profileData.position}
                    onChange={(e) => setProfileData(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('website')}
                  </label>
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('bio')}
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder={t('tellUsAboutYou')}
                  />
                </div>
                
                <div className="md:col-span-2 flex justify-end space-x-4">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    {t('save')}
                  </button>
                </div>
              </div>
            ) : (
              /* Affichage des informations */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t('personalInfo')}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{t('email')}:</span>
                      <p className="text-gray-900 dark:text-white">{profileData.email}</p>
                    </div>
                    {profileData.phone && (
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{t('phone')}:</span>
                        <p className="text-gray-900 dark:text-white">{profileData.phone}</p>
                      </div>
                    )}
                    {profileData.website && (
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{t('website')}:</span>
                        <a href={profileData.website} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-500 hover:text-blue-600">
                          {profileData.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t('professionalInfo')}
                  </h3>
                  <div className="space-y-3">
                    {profileData.company && (
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{t('company')}:</span>
                        <p className="text-gray-900 dark:text-white">{profileData.company}</p>
                      </div>
                    )}
                    {profileData.position && (
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{t('position')}:</span>
                        <p className="text-gray-900 dark:text-white">{profileData.position}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {profileData.bio && (
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {t('aboutSection')}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {profileData.bio}
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
