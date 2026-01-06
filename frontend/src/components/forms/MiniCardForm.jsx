import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  MapPinIcon,
  PlusIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const MiniCardForm = ({ onSubmit, onClose, isOpen = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation schema for quick creation
  const schema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().min(10, 'Description must be at least 10 characters').required('Description is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    company: yup.string(),
    website: yup.string().url('Invalid website URL'),
    address: yup.string()
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      email: '',
      phone: '',
      company: '',
      website: '',
      address: ''
    }
  });

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Direct API call for anonymous creation - always use production URL
      const API_URL = 'https://futuristcards.onrender.com/api';
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(`${API_URL}/cards/public`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error creating card');
      }

      const result = await response.json();
      
      toast.success('Card created successfully! 🎉');
      
      if (onSubmit) {
        await onSubmit(result.card);
      }
      
      setSubmitSuccess(true);
      reset();
      
      // Close form after success
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Card creation error:', error);
      if (error.name === 'AbortError') {
        toast.error('Request timeout - please try again');
      } else {
        toast.error(error.message || 'Failed to create card');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      data-testid="mini-card-modal"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 mr-4">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white" data-testid="mini-card-modal-title">
                Create Mini Card
              </h2>
              <p className="text-gray-300 text-sm">
                Create a quick digital card
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg"
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-400 font-medium">
                Card created successfully!
              </p>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Title & Description */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <UserIcon className="w-4 h-4 mr-2" />
                Title *
              </label>
              <input
                {...register('title')}
                type="text"
                name="title"
                data-testid="mini-card-title"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all"
                placeholder="e.g., Senior Developer"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Description *
              </label>
              <textarea
                {...register('description')}
                rows={3}
                name="description"
                data-testid="mini-card-description"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all resize-none"
                placeholder="Brief description of your role or services..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <EnvelopeIcon className="w-4 h-4 mr-2" />
                Email *
              </label>
              <input
                {...register('email')}
                type="email"
                name="email"
                data-testid="mini-card-email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <PhoneIcon className="w-4 h-4 mr-2" />
                Phone *
              </label>
              <input
                {...register('phone')}
                type="tel"
                name="phone"
                data-testid="mini-card-phone"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all"
                placeholder="+1 (555) 000-0000"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Optional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                Company
              </label>
              <input
                {...register('company')}
                type="text"
                name="company"
                data-testid="mini-card-company"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all"
                placeholder="Your Company Name"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <GlobeAltIcon className="w-4 h-4 mr-2" />
                Website
              </label>
              <input
                {...register('website')}
                type="url"
                name="website"
                data-testid="mini-card-website"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all"
                placeholder="https://yourwebsite.com"
              />
              {errors.website && (
                <p className="mt-1 text-sm text-red-400">{errors.website.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <MapPinIcon className="w-4 h-4 mr-2" />
              Address
            </label>
            <input
              {...register('address')}
              type="text"
              name="address"
              data-testid="mini-card-address"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all"
              placeholder="Your Business Address"
            />
          </div>

          {/* Preview Info */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-blue-400 text-sm font-medium mb-1">
                  Preview Info
                </p>
                <p className="text-blue-300 text-sm">
                  This card will be created as a public mini-card. You can upgrade to a full account later to claim it.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:from-indigo-600 hover:to-purple-600"
              data-testid="submit-button"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Create Card
                </div>
              )}
            </motion.button>

            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
              data-testid="cancel-button"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default MiniCardForm;
