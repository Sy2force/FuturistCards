import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  MapPinIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

const API_URL = 'https://futuristcards.onrender.com/api';

const CreateCardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    company: '',
    email: user?.email || '',
    phone: '',
    website: '',
    address: '',
    description: '',
    image: null,
    backgroundColor: '#1e293b',
    textColor: '#ffffff',
    accentColor: '#3b82f6'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      
      // Create card data
      const cardData = {
        fullName: formData.fullName || formData.name,
        title: formData.title,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        address: formData.address,
        description: formData.description,
        image: imagePreview || null,
        style: {
          backgroundColor: formData.backgroundColor,
          textColor: formData.textColor,
          accentColor: formData.accentColor
        }
      };

      // Try to save to API
      const res = await fetch(`${API_URL}/cards`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
      });

      if (res.ok) {
        const data = await res.json();
        toast.success('Card created successfully! 🎉');
        navigate('/my-cards');
      } else {
        // Fallback to localStorage if API fails
        const newCard = {
          id: Date.now().toString(),
          _id: Date.now().toString(),
          ...cardData,
          userId: user?._id || user?.id,
          user: user?._id || user?.id,
          createdAt: new Date().toISOString(),
          views: 0,
          likes: []
        };

        const existingCards = JSON.parse(localStorage.getItem('userCards') || '[]');
        existingCards.push(newCard);
        localStorage.setItem('userCards', JSON.stringify(existingCards));
        
        toast.success('Card saved locally! 📝');
        navigate('/my-cards');
      }
    } catch (error) {
      // Fallback to localStorage on error
      const newCard = {
        id: Date.now().toString(),
        _id: Date.now().toString(),
        fullName: formData.fullName,
        title: formData.title,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        address: formData.address,
        description: formData.description,
        image: imagePreview,
        style: {
          backgroundColor: formData.backgroundColor,
          textColor: formData.textColor,
          accentColor: formData.accentColor
        },
        userId: user?._id || user?.id,
        user: user?._id || user?.id,
        createdAt: new Date().toISOString(),
        views: 0,
        likes: []
      };

      const existingCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      existingCards.push(newCard);
      localStorage.setItem('userCards', JSON.stringify(existingCards));
      
      toast.success('Card saved locally! 📝');
      navigate('/my-cards');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Card - FuturistCards</title>
        <meta name="description" content="Create your professional digital business card" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl font-bold text-white mb-4">Create Your Card</h1>
              <p className="text-xl text-gray-300">Design your professional digital business card</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Full Name *</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Job Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Software Developer"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Company</label>
                    <div className="relative">
                      <BuildingOfficeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Email *</label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Phone</label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Website</label>
                    <div className="relative">
                      <GlobeAltIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Address</label>
                    <div className="relative">
                      <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="123 Main St, City"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      placeholder="Brief description about yourself..."
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Profile Image</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/10 border border-white/20 border-dashed rounded-lg text-gray-400 cursor-pointer hover:bg-white/20 transition-colors"
                      >
                        <PhotoIcon className="w-5 h-5" />
                        {imagePreview ? 'Change Image' : 'Upload Image'}
                      </label>
                    </div>
                  </div>

                  {/* Color Pickers */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Background</label>
                      <input
                        type="color"
                        name="backgroundColor"
                        value={formData.backgroundColor}
                        onChange={handleInputChange}
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Text</label>
                      <input
                        type="color"
                        name="textColor"
                        value={formData.textColor}
                        onChange={handleInputChange}
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Accent</label>
                      <input
                        type="color"
                        name="accentColor"
                        value={formData.accentColor}
                        onChange={handleInputChange}
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Card'}
                  </motion.button>
                </form>
              </motion.div>

              {/* Preview */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:sticky lg:top-24"
              >
                <h3 className="text-xl font-bold text-white mb-4">Preview</h3>
                <div
                  className="rounded-2xl p-6 shadow-2xl"
                  style={{ backgroundColor: formData.backgroundColor }}
                >
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4"
                      style={{ borderColor: formData.accentColor }}
                    />
                  )}
                  <h2
                    className="text-2xl font-bold text-center mb-1"
                    style={{ color: formData.textColor }}
                  >
                    {formData.fullName || 'Your Name'}
                  </h2>
                  <p
                    className="text-center mb-4"
                    style={{ color: formData.accentColor }}
                  >
                    {formData.title || 'Job Title'}
                  </p>
                  {formData.company && (
                    <p className="text-center text-sm mb-4" style={{ color: formData.textColor, opacity: 0.8 }}>
                      {formData.company}
                    </p>
                  )}
                  <div className="space-y-2 text-sm" style={{ color: formData.textColor, opacity: 0.9 }}>
                    {formData.email && <p>📧 {formData.email}</p>}
                    {formData.phone && <p>📱 {formData.phone}</p>}
                    {formData.website && <p>🌐 {formData.website}</p>}
                    {formData.address && <p>📍 {formData.address}</p>}
                  </div>
                  {formData.description && (
                    <p className="mt-4 text-sm" style={{ color: formData.textColor, opacity: 0.7 }}>
                      {formData.description}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCardPage;
