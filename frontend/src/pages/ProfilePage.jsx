import React, { useState, useEffect } from 'react';
import { useTranslation } from "../hooks/useTranslation";
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, CameraIcon } from '@heroicons/react/24/outline';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import GlassInput from '../components/ui/GlassInput';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      bio: user?.bio || '',
      company: user?.company || '',
      position: user?.position || ''
    }
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.name || '');
      setValue('email', user.email || '');
      setValue('phone', user.phone || '');
      setValue('location', user.location || '');
      setValue('bio', user.bio || '');
      setValue('company', user.company || '');
      setValue('position', user.position || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      if (avatar) {
        formData.append('avatar', avatar);
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user data
      const updatedUser = { ...user, ...data };
      updateUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success(t('profile.updateSuccess'));
    } catch (error) {
      toast.error(t('profile.updateError'));
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        // Preview avatar
        const preview = document.getElementById('avatar-preview');
        if (preview) {
          preview.src = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('profile.title')} - {t('common.siteName')}</title>
        <meta name="description" content={t('profile.subtitle')} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8" dir="rtl" lang="he">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-white mb-8">{t('profile.title')}</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Avatar Section */}
              <GlassCard className="p-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={t('profile.avatarAlt')} className="w-24 h-24 rounded-full object-cover" />
                      ) : (
                        <UserIcon className="w-12 h-12 text-white" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                      <CameraIcon className="w-4 h-4 text-white" />
                      <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                  </label>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{user?.name || t('profile.noName')}</h3>
                  <p className="text-white/70">{user?.email}</p>
                  <p className="text-white/50 text-sm">{t('profile.member')} {new Date(user?.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </GlassCard>

              {/* Personal Info */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">{t('profile.personalInfo')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      {t('auth.firstName')}
                    </label>
                    <GlassInput
                      {...register('name')}
                      placeholder={t('auth.firstNamePlaceholder')}
                      error={errors.name?.message}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      {t('auth.email')}
                    </label>
                    <GlassInput
                      {...register('email')}
                      type="email"
                      placeholder={t('auth.emailPlaceholder')}
                      error={errors.email?.message}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      {t('auth.phone')}
                    </label>
                    <GlassInput
                      {...register('phone')}
                      type="tel"
                      placeholder={t('auth.phonePlaceholder')}
                      error={errors.phone?.message}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      {t('common.address')}
                    </label>
                    <GlassInput
                      {...register('location')}
                      placeholder={t('profile.addressPlaceholder')}
                      error={errors.location?.message}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      {t('profile.company')}
                    </label>
                    <GlassInput
                      {...register('company')}
                      placeholder={t('profile.companyPlaceholder')}
                      error={errors.company?.message}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      {t('profile.position')}
                    </label>
                    <GlassInput
                      {...register('position')}
                      placeholder={t('profile.positionPlaceholder')}
                      error={errors.position?.message}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      {t('profile.bio')}
                    </label>
                    <GlassInput
                      {...register('bio')}
                      multiline
                      rows={4}
                      placeholder={t('profile.bioPlaceholder')}
                      error={errors.bio?.message}
                    />
                  </div>
                </div>
              </GlassCard>

              {/* Action Buttons */}
              <GlassCard className="p-6">
                <div className="flex justify-end space-x-4">
                  <GlassButton
                    type="button"
                    variant="secondary"
                    onClick={() => window.history.back()}
                  >
                    {t('common.cancel')}
                  </GlassButton>
                  <GlassButton
                    type="submit"
                    loading={loading}
                    disabled={loading}
                  >
                    {t('profile.saveChanges')}
                  </GlassButton>
                </div>
              </GlassCard>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
