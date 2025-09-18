import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApiCall } from '../hooks/useAxios';
import api from '../api/axios';
import GlassContainer from '../components/common/GlassContainer';
import ButtonGlass from '../components/common/ButtonGlass';

const CreateCard = () => {
  const navigate = useNavigate();
  const { execute, loading, error } = useApiCall();
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    phone: '',
    email: '',
    web: '',
    image: {
      url: '',
      alt: ''
    },
    address: {
      state: '',
      country: '',
      city: '',
      street: '',
      houseNumber: '',
      zip: ''
    },
    category: 'Technology',
    tags: [],
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    },
    businessHours: {
      monday: { open: '09:00', close: '17:00', closed: false },
      tuesday: { open: '09:00', close: '17:00', closed: false },
      wednesday: { open: '09:00', close: '17:00', closed: false },
      thursday: { open: '09:00', close: '17:00', closed: false },
      friday: { open: '09:00', close: '17:00', closed: false },
      saturday: { open: '10:00', close: '16:00', closed: false },
      sunday: { open: '10:00', close: '16:00', closed: true }
    }
  });
  
  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState('');

  const categories = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
    'Food & Beverage', 'Real Estate', 'Legal', 'Consulting', 'Marketing',
    'Construction', 'Transportation', 'Entertainment', 'Sports & Fitness',
    'Beauty & Wellness', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child, grandchild] = name.split('.');
      if (grandchild) {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: {
              ...prev[parent][child],
              [grandchild]: type === 'checkbox' ? checked : value
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 2 || formData.title.length > 256) {
      newErrors.title = 'Title must be between 2 and 256 characters';
    }

    if (!formData.subtitle.trim()) {
      newErrors.subtitle = 'Subtitle is required';
    } else if (formData.subtitle.length < 2 || formData.subtitle.length > 256) {
      newErrors.subtitle = 'Subtitle must be between 2 and 256 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 2 || formData.description.length > 1024) {
      newErrors.description = 'Description must be between 2 and 1024 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^0[2-9]\d{7,8}$/.test(formData.phone)) {
      newErrors.phone = 'Please provide a valid Israeli phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.web && !/^https?:\/\/.+/.test(formData.web)) {
      newErrors.web = 'Please provide a valid website URL';
    }

    if (!formData.image.url.trim()) {
      newErrors['image.url'] = 'Image URL is required';
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(formData.image.url)) {
      newErrors['image.url'] = 'Please provide a valid image URL';
    }

    if (!formData.image.alt.trim()) {
      newErrors['image.alt'] = 'Image description is required';
    } else if (formData.image.alt.length < 2 || formData.image.alt.length > 256) {
      newErrors['image.alt'] = 'Image description must be between 2 and 256 characters';
    }

    if (!formData.address.country.trim()) {
      newErrors['address.country'] = 'Country is required';
    }

    if (!formData.address.city.trim()) {
      newErrors['address.city'] = 'City is required';
    }

    if (!formData.address.street.trim()) {
      newErrors['address.street'] = 'Street is required';
    }

    if (!formData.address.houseNumber.trim()) {
      newErrors['address.houseNumber'] = 'House number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const result = await execute(async () => {
      const response = await api.post('/cards', formData);
      return response.data;
    });

    if (result.success) {
      navigate('/my-cards');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
            Create Business Card
          </h1>
          <p className="text-xl text-white/70">
            Design your professional digital business card
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassContainer className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">
                      Business Name *
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                      className={`glass-input w-full ${errors.title ? 'border-red-400/50' : ''}`}
                      placeholder="Your Business Name"
                    />
                    {errors.title && <p className="form-error">{errors.title}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="subtitle" className="form-label">
                      Tagline/Subtitle *
                    </label>
                    <input
                      id="subtitle"
                      name="subtitle"
                      type="text"
                      value={formData.subtitle}
                      onChange={handleChange}
                      className={`glass-input w-full ${errors.subtitle ? 'border-red-400/50' : ''}`}
                      placeholder="Your business tagline"
                    />
                    {errors.subtitle && <p className="form-error">{errors.subtitle}</p>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className={`glass-input w-full resize-none ${errors.description ? 'border-red-400/50' : ''}`}
                    placeholder="Describe your business, services, and what makes you unique..."
                  />
                  {errors.description && <p className="form-error">{errors.description}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="category" className="form-label">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="glass-input w-full"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`glass-input w-full ${errors.phone ? 'border-red-400/50' : ''}`}
                      placeholder="0501234567"
                    />
                    {errors.phone && <p className="form-error">{errors.phone}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`glass-input w-full ${errors.email ? 'border-red-400/50' : ''}`}
                      placeholder="business@example.com"
                    />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="web" className="form-label">
                    Website
                  </label>
                  <input
                    id="web"
                    name="web"
                    type="url"
                    value={formData.web}
                    onChange={handleChange}
                    className={`glass-input w-full ${errors.web ? 'border-red-400/50' : ''}`}
                    placeholder="https://www.yourbusiness.com"
                  />
                  {errors.web && <p className="form-error">{errors.web}</p>}
                </div>
              </div>

              {/* Image */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white">Business Image</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label htmlFor="image.url" className="form-label">
                      Image URL *
                    </label>
                    <input
                      id="image.url"
                      name="image.url"
                      type="url"
                      value={formData.image.url}
                      onChange={handleChange}
                      className={`glass-input w-full ${errors['image.url'] ? 'border-red-400/50' : ''}`}
                      placeholder="https://example.com/image.jpg"
                    />
                    {errors['image.url'] && <p className="form-error">{errors['image.url']}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="image.alt" className="form-label">
                      Image Description *
                    </label>
                    <input
                      id="image.alt"
                      name="image.alt"
                      type="text"
                      value={formData.image.alt}
                      onChange={handleChange}
                      className={`glass-input w-full ${errors['image.alt'] ? 'border-red-400/50' : ''}`}
                      placeholder="Business logo or storefront"
                    />
                    {errors['image.alt'] && <p className="form-error">{errors['image.alt']}</p>}
                  </div>
                </div>

                {formData.image.url && (
                  <div className="mt-4">
                    <p className="form-label mb-2">Preview:</p>
                    <img
                      src={formData.image.url}
                      alt={formData.image.alt}
                      className="w-full max-w-md h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white">Address</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label htmlFor="address.country" className="form-label">
                      Country *
                    </label>
                    <input
                      id="address.country"
                      name="address.country"
                      type="text"
                      value={formData.address.country}
                      onChange={handleChange}
                      className={`glass-input w-full ${errors['address.country'] ? 'border-red-400/50' : ''}`}
                      placeholder="Israel"
                    />
                    {errors['address.country'] && <p className="form-error">{errors['address.country']}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="address.city" className="form-label">
                      City *
                    </label>
                    <input
                      id="address.city"
                      name="address.city"
                      type="text"
                      value={formData.address.city}
                      onChange={handleChange}
                      className={`glass-input w-full ${errors['address.city'] ? 'border-red-400/50' : ''}`}
                      placeholder="Tel Aviv"
                    />
                    {errors['address.city'] && <p className="form-error">{errors['address.city']}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="form-group">
                    <label htmlFor="address.street" className="form-label">
                      Street *
                    </label>
                    <input
                      id="address.street"
                      name="address.street"
                      type="text"
                      value={formData.address.street}
                      onChange={handleChange}
                      className={`glass-input w-full ${errors['address.street'] ? 'border-red-400/50' : ''}`}
                      placeholder="Rothschild Blvd"
                    />
                    {errors['address.street'] && <p className="form-error">{errors['address.street']}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="address.houseNumber" className="form-label">
                      House Number *
                    </label>
                    <input
                      id="address.houseNumber"
                      name="address.houseNumber"
                      type="text"
                      value={formData.address.houseNumber}
                      onChange={handleChange}
                      className={`glass-input w-full ${errors['address.houseNumber'] ? 'border-red-400/50' : ''}`}
                      placeholder="123"
                    />
                    {errors['address.houseNumber'] && <p className="form-error">{errors['address.houseNumber']}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="address.zip" className="form-label">
                      ZIP Code
                    </label>
                    <input
                      id="address.zip"
                      name="address.zip"
                      type="text"
                      value={formData.address.zip}
                      onChange={handleChange}
                      className="glass-input w-full"
                      placeholder="12345"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address.state" className="form-label">
                    State/Region
                  </label>
                  <input
                    id="address.state"
                    name="address.state"
                    type="text"
                    value={formData.address.state}
                    onChange={handleChange}
                    className="glass-input w-full"
                    placeholder="Optional"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white">Tags</h3>
                
                <div className="form-group">
                  <label htmlFor="tagInput" className="form-label">
                    Add Tags (Press Enter or click Add)
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="tagInput"
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="glass-input flex-1"
                      placeholder="e.g., restaurant, delivery, kosher"
                    />
                    <ButtonGlass
                      type="button"
                      variant="secondary"
                      onClick={handleAddTag}
                      disabled={!tagInput.trim()}
                    >
                      Add
                    </ButtonGlass>
                  </div>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full border border-primary-400/30 flex items-center gap-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-primary-400 hover:text-primary-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Social Media */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white">Social Media (Optional)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label htmlFor="socialMedia.facebook" className="form-label">
                      Facebook
                    </label>
                    <input
                      id="socialMedia.facebook"
                      name="socialMedia.facebook"
                      type="url"
                      value={formData.socialMedia.facebook}
                      onChange={handleChange}
                      className="glass-input w-full"
                      placeholder="https://facebook.com/yourbusiness"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="socialMedia.twitter" className="form-label">
                      Twitter
                    </label>
                    <input
                      id="socialMedia.twitter"
                      name="socialMedia.twitter"
                      type="url"
                      value={formData.socialMedia.twitter}
                      onChange={handleChange}
                      className="glass-input w-full"
                      placeholder="https://twitter.com/yourbusiness"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="socialMedia.linkedin" className="form-label">
                      LinkedIn
                    </label>
                    <input
                      id="socialMedia.linkedin"
                      name="socialMedia.linkedin"
                      type="url"
                      value={formData.socialMedia.linkedin}
                      onChange={handleChange}
                      className="glass-input w-full"
                      placeholder="https://linkedin.com/company/yourbusiness"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="socialMedia.instagram" className="form-label">
                      Instagram
                    </label>
                    <input
                      id="socialMedia.instagram"
                      name="socialMedia.instagram"
                      type="url"
                      value={formData.socialMedia.instagram}
                      onChange={handleChange}
                      className="glass-input w-full"
                      placeholder="https://instagram.com/yourbusiness"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <ButtonGlass
                  type="button"
                  variant="ghost"
                  onClick={() => navigate('/my-cards')}
                >
                  Cancel
                </ButtonGlass>
                <ButtonGlass
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                >
                  {loading ? 'Creating Card...' : 'Create Business Card'}
                </ButtonGlass>
              </div>
            </form>
          </GlassContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateCard;
