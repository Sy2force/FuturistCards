import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeftIcon, ShareIcon, HeartIcon, EyeIcon, 
  PhoneIcon, EnvelopeIcon, GlobeAltIcon, StarIcon,
  CalendarIcon, MapPinIcon, BriefcaseIcon, PhotoIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useRoleTheme } from '../context/ThemeProvider';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { api } from '../services/api';
import { mockCards } from '../data/mockCards';
import LikeButton from '../components/ui/LikeButton';

const CardDetailsPage = () => {
  const { id } = useParams();
  
  // Set document title
  useDocumentTitle('Card Details | FuturistCards');
  const navigate = useNavigate();
  const { isDark } = useRoleTheme();
  const { favorites, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  // Favorite loading state removed - handled by context

  const fetchCard = useCallback(async () => {
    try {
      setLoading(true);
      
      // Utiliser les données centralisées
      const foundCard = mockCards.find(card => card._id === id);
      if (foundCard) {
        setCard(foundCard);
      } else {
        toast.error('card Not Found');
        navigate('/cards');
      }
    } catch (error) {
      toast.error('load Error');
      navigate('/cards');
    } finally {
      setLoading(false);
    }
  }, [id, navigate, t]);

  const checkIfFavorite = useCallback(async () => {
    try {
      const response = await api.get('/favorites');
      const favoriteCard = response.data.find(fav => fav.card._id === id);
      setIsFavorite(!!favoriteCard);
    } catch (error) {
      // Error loading favorites - continue without favorites
    }
  }, [id]);

  useEffect(() => {
    fetchCard();
    if (user) {
      checkIfFavorite();
    }
  }, [fetchCard, checkIfFavorite, user]);

  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error('login Required');
      return;
    }

    try {
      if (isFavorite) {
        await api.delete(`/favorites/${id}`);
        setIsFavorite(false);
        toast.success('removed');
      } else {
        await api.post(`/favorites/${id}`);
        setIsFavorite(true);
        toast.success('added');
      }
    } catch (error) {
      toast.error('manage Error');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${card.fullName} - ${'site Name'}`,
          text: t('cardDetails.shareText', { name: card.fullName }),
          url: window.location.href,
        });
      } catch (error) {
        // Error sharing - continue
      }
    } else {
      // Fallback: copy link
      navigator.clipboard.writeText(window.location.href);
      toast.success('link Copied');
    }
  };

  const { currentTheme } = useRoleTheme();
  const isDarkMode = currentTheme.name === 'dark';

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative mb-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
            <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-r-transparent animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {'loading'}
          </p>
        </motion.div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="text-6xl mb-6">😔</div>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{'card Not Found'}</h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {'card Not Found Message'}
          </p>
          <motion.button
            onClick={() => navigate('/cards')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium"
          >
            {'back To Cards'}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{card.title || card.fullName} - {'site Name'}</title>
        <meta name="description" content={t('cardDetails.metaDescription', { 
          name: card.title || card.fullName, 
          subtitle: card.subtitle || card.jobTitle, 
          company: card.company 
        })} />
      </Helmet>

      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header avec navigation */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8 p-4 rounded-2xl backdrop-blur-sm border"
            style={{
              backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.5)',
              borderColor: isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(229, 231, 235, 0.5)'
            }}
          >
            <motion.button
              onClick={() => navigate('/cards')}
              className={`flex items-center px-4 py-2 rounded-xl transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              {'back To Cards'}
            </motion.button>

            <div className="flex items-center space-x-3">
              <LikeButton 
                cardId={id}
                size="lg"
                showCount={true}
                className="px-4 py-2"
                onLikeChange={(data) => {
                  // Update card likes count if needed
                  if (card) {
                    setCard(prev => ({ ...prev, likes: data.likesCount }));
                  }
                }}
              />

              <motion.button
                onClick={handleShare}
                className="flex items-center px-4 py-2 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500/20 transition-colors border border-blue-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShareIcon className="w-5 h-5 mr-2" />
                {'share'}
              </motion.button>
            </div>
          </motion.div>

          {/* Carte principale */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm border transition-all duration-300 ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              {/* Header de la carte avec image */}
              <div className="relative">
                <div className="aspect-[3/1] relative overflow-hidden">
                  {card.image ? (
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-700"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <div className="flex items-end space-x-6">
                    {card.image && (
                      <div className="flex-shrink-0">
                        <img 
                          src={card.image} 
                          alt={card.title}
                          className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl border-4 border-white shadow-xl object-cover"
                        />
                      </div>
                    )}
                    <div className="text-white flex-1">
                      <h1 className="text-2xl lg:text-4xl font-bold mb-2">{card.title}</h1>
                      <p className="text-lg lg:text-xl opacity-90 mb-1">{card.subtitle}</p>
                      <p className="text-base lg:text-lg opacity-80">{card.company}</p>
                      
                      <div className="flex items-center mt-4 space-x-4 text-sm opacity-80">
                        <div className="flex items-center">
                          <EyeIcon className="w-4 h-4 mr-1" />
                          <span>{card.views || 0} {'views'}</span>
                        </div>
                        <div className="flex items-center">
                          <HeartIconSolid className="w-4 h-4 mr-1" />
                          <span>{card.likes || 0} {'likes'}</span>
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          <span>{new Date(card.createdAt).toLocaleDateString('he-IL')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenu de la carte */}
              <div className="p-6 lg:p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Informations de contact */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{'contact Info'}</h2>
                    <div className="space-y-4">
                      {card.email && (
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center p-4 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}
                        >
                          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 mr-4">
                            <EnvelopeIcon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{'Email'}</p>
                            <a 
                              href={`mailto:${card.email}`}
                              className="text-blue-500 hover:text-blue-600 transition-colors font-medium"
                            >
                              {card.email}
                            </a>
                          </div>
                        </motion.div>
                      )}

                      {card.phone && (
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center p-4 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}
                        >
                          <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 mr-4">
                            <PhoneIcon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{'Phone'}</p>
                            <a 
                              href={`tel:${card.phone}`}
                              className="text-green-500 hover:text-green-600 transition-colors font-medium"
                            >
                              {card.phone}
                            </a>
                          </div>
                        </motion.div>
                      )}

                      {card.website && (
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center p-4 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}
                        >
                          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 mr-4">
                            <GlobeAltIcon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{'website'}</p>
                            <a 
                              href={card.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-500 hover:text-purple-600 transition-colors font-medium"
                            >
                              {card.website}
                            </a>
                          </div>
                        </motion.div>
                      )}

                      {card.address && (
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center p-4 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}
                        >
                          <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 mr-4">
                            <MapPinIcon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{'Address'}</p>
                            <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{card.address}</p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  {/* Description et informations avancées */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{'about'}</h2>
                    <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      {card.description ? (
                        <p className={`leading-relaxed text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{card.description}</p>
                      ) : (
                        <p className={`text-lg italic ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{'no Description'}</p>
                      )}
                    </div>

                    {/* Rating et Reviews */}
                    {card.rating && (
                      <div className="mt-8">
                        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{'rating'}</h3>
                        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700/30' : 'bg-gradient-to-r from-yellow-50 to-orange-50'}`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 gap-2">
                              <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon 
                                    key={i} 
                                    className={`w-5 h-5 ${i < Math.floor(card.rating) ? 'fill-current' : 'opacity-30'}`} 
                                  />
                                ))}
                              </div>
                              <span className={`text-2xl font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                {card.rating}
                              </span>
                            </div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {card.reviews} {'reviews'}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Compétences */}
                    {card.skills && card.skills.length > 0 && (
                      <div className="mt-8">
                        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{'skills'}</h3>
                        <div className="flex flex-wrap gap-2">
                          {card.skills.map((skill, index) => (
                            <motion.span 
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 * index }}
                              className={`px-3 py-2 rounded-full text-sm font-medium ${isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Services */}
                    {card.services && card.services.length > 0 && (
                      <div className="mt-8">
                        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{'services'}</h3>
                        <div className="grid gap-3">
                          {card.services.map((service, index) => (
                            <motion.div 
                              key={service}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index }}
                              className={`flex items-center p-4 rounded-xl ${isDarkMode ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}
                            >
                              <BriefcaseIcon className="w-5 h-5 text-blue-500 mr-3" />
                              <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{service}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Statistiques */}
                    <div className="mt-8">
                      <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{'statistics'}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`text-center p-4 rounded-xl ${isDarkMode ? 'bg-gray-700/30' : 'bg-blue-50'}`}>
                          <div className="text-2xl font-bold text-blue-500">{card.views || 0}</div>
                          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{'views'}</div>
                        </div>
                        <div className={`text-center p-4 rounded-xl ${isDarkMode ? 'bg-gray-700/30' : 'bg-red-50'}`}>
                          <div className="text-2xl font-bold text-red-500">{card.likes || 0}</div>
                          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{'likes'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Date de création */}
                    <div className="mt-6">
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {'member Since'} {new Date(card.createdAt).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Portfolio */}
                {card.portfolio && card.portfolio.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8"
                  >
                    <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{'portfolio'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {card.portfolio.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ scale: 1.02, y: -4 }}
                          className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-white'} border transition-all duration-300 ${isDarkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <div className="aspect-video relative overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                              <div className="p-4">
                                <PhotoIcon className="w-6 h-6 text-white mb-2" />
                                <p className="text-white font-medium">{'view Project'}</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Réseaux sociaux */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8"
                >
                  <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{'social Networks'}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {card.linkedin && (
                      <motion.a
                        href={card.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-4 rounded-xl bg-[#0077B5]/10 hover:bg-[#0077B5]/20 transition-colors border border-[#0077B5]/20"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-10 h-10 bg-[#0077B5] rounded-lg flex items-center justify-center mb-2">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                          </svg>
                        </div>
                        <span className="text-[#0077B5] font-medium text-sm">{'linkedin'}</span>
                      </motion.a>
                    )}

                    {card.github && (
                      <motion.a
                        href={card.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-4 rounded-xl bg-gray-800/10 hover:bg-gray-800/20 transition-colors border border-gray-800/20"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mb-2">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"/>
                          </svg>
                        </div>
                        <span className="text-gray-800 font-medium text-sm">{'github'}</span>
                      </motion.a>
                    )}

                    {card.instagram && (
                      <motion.a
                        href={card.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-colors border border-purple-500/20"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-2">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.718-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.061 5.877.01 6.944 0 7.284 0 10s.012 3.057.06 4.123c.167 3.632 2.182 5.65 5.817 5.817 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c3.629-.167 5.652-2.182 5.816-5.817.05-1.066.061-1.407.061-4.123s-.012-3.056-.06-4.122C19.777 2.249 17.76.228 14.124.061 13.057.01 12.716 0 10 0zm0 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/>
                          </svg>
                        </div>
                        <span className="text-purple-600 font-medium text-sm">{'instagram'}</span>
                      </motion.a>
                    )}

                    {card.twitter && (
                      <motion.a
                        href={card.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-4 rounded-xl bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 transition-colors border border-[#1DA1F2]/20"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-10 h-10 bg-[#1DA1F2] rounded-lg flex items-center justify-center mb-2">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                          </svg>
                        </div>
                        <span className="text-[#1DA1F2] font-medium text-sm">{'twitter'}</span>
                      </motion.a>
                    )}
                  </div>
                </motion.div>

                {/* Actions */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className={`mt-8 pt-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <div className="flex flex-wrap gap-4 justify-center">
                    {card.email && (
                      <motion.a
                        href={`mailto:${card.email}`}
                        className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <EnvelopeIcon className="w-5 h-5 mr-2" />
                        {'send Email'}
                      </motion.a>
                    )}

                    {card.phone && (
                      <motion.a
                        href={`tel:${card.phone}`}
                        className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <PhoneIcon className="w-5 h-5 mr-2" />
                        {'call'}
                      </motion.a>
                    )}

                    {card.website && (
                      <motion.a
                        href={card.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-xl hover:from-purple-600 hover:to-violet-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <GlobeAltIcon className="w-5 h-5 mr-2" />
                        {'visit Website'}
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetailsPage;
