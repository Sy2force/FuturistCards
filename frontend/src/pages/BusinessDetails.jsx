import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useAxios, useApiCall } from '../hooks/useAxios';
import api from '../api/axios';
import GlassContainer from '../components/common/GlassContainer';
import ButtonGlass from '../components/common/ButtonGlass';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BusinessDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { execute } = useApiCall();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const { data: cardData, loading: cardLoading, error: cardError } = useAxios(`/cards/${id}`);
  const { data: favoriteData, loading: favoriteCheckLoading } = useAxios(
    user && id ? `/favorites/check/${id}` : null
  );

  const card = cardData?.data;

  useEffect(() => {
    if (favoriteData?.data) {
      setIsFavorite(favoriteData.data.isFavorite);
    }
  }, [favoriteData]);

  const handleToggleFavorite = async () => {
    if (!user) return;

    setFavoriteLoading(true);
    const result = await execute(async () => {
      const response = await api.post(`/favorites/toggle/${id}`);
      return response.data;
    });

    if (result.success) {
      setIsFavorite(!isFavorite);
    }
    setFavoriteLoading(false);
  };

  const handleLikeToggle = async () => {
    if (!user) return;

    await execute(async () => {
      const response = await api.post(`/cards/${id}/like`);
      return response.data;
    });
  };

  const formatBusinessHours = (businessHours) => {
    if (!businessHours) return null;

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return days.map((day, index) => {
      const hours = businessHours[day];
      if (!hours) return null;

      return (
        <div key={day} className="flex justify-between items-center py-1">
          <span className="text-white/70">{dayNames[index]}</span>
          <span className="text-white">
            {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
          </span>
        </div>
      );
    });
  };

  if (cardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading business details..." />
      </div>
    );
  }

  if (cardError || !card) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <GlassContainer className="text-center max-w-md">
          <div className="text-red-400 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-white mb-2">Business Not Found</h2>
          <p className="text-white/70 mb-4">
            {cardError || 'The business card you are looking for does not exist.'}
          </p>
          <Link to="/cards">
            <ButtonGlass variant="primary">
              Browse All Cards
            </ButtonGlass>
          </Link>
        </GlassContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8"
        >
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
            <img
              src={card.image?.url || '/default-card-image.jpg'}
              alt={card.image?.alt || card.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Hero Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">
                    {card.title}
                  </h1>
                  <p className="text-xl text-white/90 mb-2">{card.subtitle}</p>
                  <div className="flex items-center space-x-4 text-white/70">
                    <span className="flex items-center">
                      <span className="mr-1">📍</span>
                      {card.address?.city}, {card.address?.country}
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">🏷️</span>
                      {card.category}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  {user && (
                    <>
                      <ButtonGlass
                        variant={isFavorite ? "danger" : "ghost"}
                        onClick={handleToggleFavorite}
                        loading={favoriteLoading || favoriteCheckLoading}
                        disabled={favoriteLoading || favoriteCheckLoading}
                      >
                        {isFavorite ? '❤️' : '🤍'} 
                        {isFavorite ? 'Favorited' : 'Add to Favorites'}
                      </ButtonGlass>
                      <ButtonGlass
                        variant="ghost"
                        onClick={handleLikeToggle}
                      >
                        👍 Like
                      </ButtonGlass>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassContainer>
                <h2 className="text-2xl font-semibold text-white mb-4">About</h2>
                <p className="text-white/80 leading-relaxed">{card.description}</p>
              </GlassContainer>
            </motion.div>

            {/* Tags */}
            {card.tags && card.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlassContainer>
                  <h2 className="text-2xl font-semibold text-white mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full border border-primary-400/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassContainer>
              </motion.div>
            )}

            {/* Business Hours */}
            {card.businessHours && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassContainer>
                  <h2 className="text-2xl font-semibold text-white mb-4">Business Hours</h2>
                  <div className="space-y-2">
                    {formatBusinessHours(card.businessHours)}
                  </div>
                </GlassContainer>
              </motion.div>
            )}

            {/* Social Media */}
            {card.socialMedia && Object.values(card.socialMedia).some(url => url) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <GlassContainer>
                  <h2 className="text-2xl font-semibold text-white mb-4">Follow Us</h2>
                  <div className="flex flex-wrap gap-3">
                    {card.socialMedia.facebook && (
                      <a
                        href={card.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 text-blue-300 rounded-lg border border-blue-400/30 hover:bg-blue-600/30 transition-colors"
                      >
                        <span>📘</span>
                        <span>Facebook</span>
                      </a>
                    )}
                    {card.socialMedia.twitter && (
                      <a
                        href={card.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-sky-500/20 text-sky-300 rounded-lg border border-sky-400/30 hover:bg-sky-500/30 transition-colors"
                      >
                        <span>🐦</span>
                        <span>Twitter</span>
                      </a>
                    )}
                    {card.socialMedia.linkedin && (
                      <a
                        href={card.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-700/20 text-blue-300 rounded-lg border border-blue-400/30 hover:bg-blue-700/30 transition-colors"
                      >
                        <span>💼</span>
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {card.socialMedia.instagram && (
                      <a
                        href={card.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-pink-600/20 text-pink-300 rounded-lg border border-pink-400/30 hover:bg-pink-600/30 transition-colors"
                      >
                        <span>📷</span>
                        <span>Instagram</span>
                      </a>
                    )}
                  </div>
                </GlassContainer>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassContainer>
                <h3 className="text-xl font-semibold text-white mb-4">Contact Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-primary-400">📞</span>
                    <a
                      href={`tel:${card.phone}`}
                      className="text-white hover:text-primary-300 transition-colors"
                    >
                      {card.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-primary-400">✉️</span>
                    <a
                      href={`mailto:${card.email}`}
                      className="text-white hover:text-primary-300 transition-colors"
                    >
                      {card.email}
                    </a>
                  </div>
                  {card.web && (
                    <div className="flex items-center space-x-3">
                      <span className="text-primary-400">🌐</span>
                      <a
                        href={card.web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-primary-300 transition-colors"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </GlassContainer>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassContainer>
                <h3 className="text-xl font-semibold text-white mb-4">Address</h3>
                <div className="text-white/80 space-y-1">
                  <div>{card.address?.houseNumber} {card.address?.street}</div>
                  <div>{card.address?.city}, {card.address?.state}</div>
                  <div>{card.address?.country} {card.address?.zip}</div>
                </div>
                <div className="mt-4">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${card.address?.houseNumber} ${card.address?.street}, ${card.address?.city}, ${card.address?.country}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ButtonGlass variant="secondary" size="sm" className="w-full">
                      📍 View on Map
                    </ButtonGlass>
                  </a>
                </div>
              </GlassContainer>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassContainer>
                <h3 className="text-xl font-semibold text-white mb-4">Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Likes</span>
                    <span className="text-white font-semibold">❤️ {card.likesCount || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Views</span>
                    <span className="text-white font-semibold">👁️ {card.viewsCount || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Created</span>
                    <span className="text-white font-semibold">
                      {new Date(card.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </GlassContainer>
            </motion.div>

            {/* Owner Actions */}
            {user && card.user && user._id === card.user._id && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <GlassContainer>
                  <h3 className="text-xl font-semibold text-white mb-4">Manage Card</h3>
                  <div className="space-y-3">
                    <Link to={`/edit-card/${card._id}`}>
                      <ButtonGlass variant="primary" size="sm" className="w-full">
                        ✏️ Edit Card
                      </ButtonGlass>
                    </Link>
                    <Link to="/my-cards">
                      <ButtonGlass variant="ghost" size="sm" className="w-full">
                        📋 My Cards
                      </ButtonGlass>
                    </Link>
                  </div>
                </GlassContainer>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
