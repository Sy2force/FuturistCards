import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useRoleTheme } from '../context/ThemeProvider';
import { UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, CameraIcon } from '@heroicons/react/24/outline';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import GlassInput from '../components/ui/GlassInput';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const { currentTheme } = useRoleTheme();
  const navigate = useNavigate();
  
  // Set document title
  
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
      updateProfile(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
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
        <title>My Profile - FuturistCards</title>
        <meta name="description" content="Manage your personal profile information and account settings" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-white mb-8">My Profile</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Avatar Section */}
              <GlassCard className="p-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      {user?.avatar ? (
                        <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full object-cover" />
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
                  <h3 className="text-xl font-semibold text-white">{user?.name || 'No Name'}</h3>
                  <p className="text-white/70">{user?.email}</p>
                  <p className="text-white/50 text-sm">Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
                </div>
              </div>
            </GlassCard>

              {/* Personal Info */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Full Name
                    </label>
                    <GlassInput
                      {...register('name')}
                      placeholder="Enter your full name"
                      error={errors.name?.message}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Email Address
                    </label>
                    <GlassInput
                      {...register('email')}
                      type="email"
                      placeholder="Enter your email address"
                      error={errors.email?.message}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Phone Number
                    </label>
                    <GlassInput
                      {...register('phone')}
                      type="tel"
                      placeholder="Enter your phone number"
                      error={errors.phone?.message}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Location
                    </label>
                    <GlassInput
                      {...register('location')}
                      placeholder="Enter your location"
                      error={errors.location?.message}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Company
                    </label>
                    <GlassInput
                      {...register('company')}
                      placeholder="Enter your company name"
                      error={errors.company?.message}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Job Title
                    </label>
                    <GlassInput
                      {...register('position')}
                      placeholder="Enter your job title"
                      error={errors.position?.message}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Biography
                    </label>
                    <GlassInput
                      {...register('bio')}
                      multiline
                      rows={4}
                      placeholder="Tell us about yourself..."
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
                    Cancel
                  </GlassButton>
                  <GlassButton
                    type="submit"
                    loading={loading}
                    disabled={loading}
                  >
                    Save Changes
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
