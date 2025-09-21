// CardDetailsPage - Page de détails d'une carte de visite
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  HeartIcon,
  EyeIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ButtonGlass from '../components/common/ButtonGlass';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const CardDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    if (id) {
      loadCard();
    }
  }, [id, loadCard]);

  const loadCard = useCallback(async () => {
    try {
      setLoading(true);
      
      // Mock data avec localStorage - vérifier plusieurs sources
      let mockCards = JSON.parse(localStorage.getItem('mockCards') || '[]');
      
      // Si pas de cartes dans mockCards, créer des cartes d'exemple
      if (mockCards.length === 0) {
        mockCards = [
          {
            _id: 'mock-card-1',
            userId: 'mock-user-1',
            title: 'Jean Dupont',
            subtitle: 'Développeur Full-Stack',
            description: 'Expert en développement web moderne avec React, Node.js et MongoDB. Passionné par les nouvelles technologies.',
            email: 'jean.dupont@example.com',
            phone: '+33 6 12 34 56 78',
            website: 'https://jeandupont.dev',
            category: 'Technology',
            skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'TypeScript'],
            createdAt: new Date().toISOString(),
            views: 45,
            likes: 12,
            image: 'https://picsum.photos/150/150?random=1'
          },
          {
            _id: 'mock-card-2',
            userId: 'mock-user-2',
            title: 'Marie Martin',
            subtitle: 'Designer UX/UI',
            description: 'Créatrice d\'expériences utilisateur exceptionnelles. Spécialisée en design mobile et interfaces modernes.',
            email: 'marie.martin@example.com',
            phone: '+33 6 98 76 54 32',
            website: 'https://mariemartin.design',
            category: 'Design',
            skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
            createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
            views: 32,
            likes: 8,
            image: 'https://picsum.photos/150/150?random=2'
          }
        ];
        localStorage.setItem('mockCards', JSON.stringify(mockCards));
      }
      
      const foundCard = mockCards.find(c => c._id === id);
      
      if (!foundCard) {
        toast.error(t('cardNotFound') || 'Carte introuvable');
        navigate('/cards');
        return;
      }
      
      // Incrémenter les vues
      foundCard.views = (foundCard.views || 0) + 1;
      const updatedCards = mockCards.map(c => c._id === id ? foundCard : c);
      localStorage.setItem('mockCards', JSON.stringify(updatedCards));
      
      setCard(foundCard);
      setLikes(foundCard.likes || 0);
      setViews(foundCard.views || 0);
      setComments(foundCard.comments || []);
      
      // Vérifier si la carte est dans les favoris
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsLiked(favorites.includes(id));
      
    } catch (error) {
      toast.error(t('cardNotFound') || 'Carte introuvable');
      navigate('/cards');
    } finally {
      setLoading(false);
    }
  }, [id, navigate, t]);

  const handleToggleLike = async () => {
    if (!isAuthenticated) {
      toast.error(t('loginRequired') || 'Vous devez être connecté pour aimer une carte');
      return;
    }

    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const mockCards = JSON.parse(localStorage.getItem('mockCards') || '[]');
      
      let updatedFavorites;
      let newLikeCount;
      
      if (isLiked) {
        updatedFavorites = favorites.filter(fav => fav !== id);
        newLikeCount = Math.max(0, likes - 1);
      } else {
        updatedFavorites = [...favorites, id];
        newLikeCount = likes + 1;
      }
      
      // Mettre à jour les favoris
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      
      // Mettre à jour le nombre de likes dans la carte
      const updatedCards = mockCards.map(c => {
        if (c._id === id) {
          return { ...c, likes: newLikeCount };
        }
        return c;
      });
      localStorage.setItem('mockCards', JSON.stringify(updatedCards));
      
      setIsLiked(!isLiked);
      setLikes(newLikeCount);
      
      toast.success(isLiked 
        ? (t('removedFromFavorites') || 'Carte retirée des favoris') 
        : (t('addedToFavorites') || 'Carte ajoutée aux favoris')
      );
    } catch (error) {
      toast.error(t('favoriteError') || 'Erreur lors de la mise à jour des favoris');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: card.title,
          text: card.description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success(t('linkCopied') || 'Lien copié dans le presse-papiers');
    }
  };

  const handleAddComment = async () => {
    if (!isAuthenticated) {
      toast.error(t('loginRequired') || 'Vous devez être connecté pour commenter');
      return;
    }

    if (!newComment.trim()) {
      toast.error(t('commentRequired') || 'Veuillez saisir un commentaire');
      return;
    }

    try {
      setIsSubmittingComment(true);
      
      const comment = {
        id: Date.now().toString(),
        text: newComment.trim(),
        author: {
          name: user.firstName + ' ' + user.lastName,
          email: user.email
        },
        createdAt: new Date().toISOString()
      };
      
      const mockCards = JSON.parse(localStorage.getItem('mockCards') || '[]');
      const updatedCards = mockCards.map(c => {
        if (c._id === id) {
          const updatedComments = [...(c.comments || []), comment];
          return { ...c, comments: updatedComments };
        }
        return c;
      });
      
      localStorage.setItem('mockCards', JSON.stringify(updatedCards));
      setComments(prev => [...prev, comment]);
      setNewComment('');
      
      toast.success(t('commentAdded') || 'Commentaire ajouté avec succès');
    } catch (error) {
      toast.error(t('commentError') || 'Erreur lors de l\'ajout du commentaire');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('cardNotFound') || 'Carte introuvable'}
          </h2>
          <Link to="/cards">
            <ButtonGlass>{t('backToCards') || 'Retour aux cartes'}</ButtonGlass>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header avec navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>{t('back') || 'Retour'}</span>
          </button>

          <div className="flex items-center space-x-3">
            <ButtonGlass
              onClick={handleToggleLike}
              variant={isLiked ? "primary" : "secondary"}
              size="sm"
              className="flex items-center space-x-2"
            >
              {isLiked ? (
                <HeartSolidIcon className="w-4 h-4 text-red-400" />
              ) : (
                <HeartIcon className="w-4 h-4" />
              )}
              <span>{likes}</span>
            </ButtonGlass>

            <ButtonGlass
              onClick={handleShare}
              variant="secondary"
              size="sm"
            >
              <span className="w-4 h-4">#</span>
            </ButtonGlass>
          </div>
        </motion.div>

        {/* Carte principale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-3xl overflow-hidden"
        >
          {/* Image de couverture */}
          {card.image && (
            <div className="h-64 bg-gradient-to-r from-blue-400 to-purple-600 relative overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}

          <div className="p-8">
            {/* En-tête de la carte */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {card.title?.charAt(0) || 'C'}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {card.title}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              {card.category && (
                <div className="flex items-center space-x-2 bg-blue-500/20 px-3 py-1 rounded-full">
                  <span className="w-4 h-4 text-blue-400">#</span>
                  <span className="text-blue-400 text-sm font-medium">
                    {card.category}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            {card.description && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  À propos
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {card.description}
                </p>
              </div>
            )}

            {/* Informations de contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {card.email && (
                <div className="flex items-center space-x-3 p-4 bg-white/5 dark:bg-white/5 rounded-xl">
                  <EnvelopeIcon className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t('email') || 'Email'}</div>
                    <a
                      href={`mailto:${card.email}`}
                      className="text-gray-900 dark:text-white hover:text-blue-400 transition-colors"
                    >
                      {card.email}
                    </a>
                  </div>
                </div>
              )}

              {card.phone && (
                <div className="flex items-center space-x-3 p-4 bg-white/5 dark:bg-white/5 rounded-xl">
                  <PhoneIcon className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t('phone') || 'Téléphone'}</div>
                    <a
                      href={`tel:${card.phone}`}
                      className="text-gray-900 dark:text-white hover:text-green-400 transition-colors"
                    >
                      {card.phone}
                    </a>
                  </div>
                </div>
              )}

              {card.website && (
                <div className="flex items-center space-x-3 p-4 bg-white/5 dark:bg-white/5 rounded-xl">
                  <GlobeAltIcon className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t('website') || 'Site web'}</div>
                    <a
                      href={card.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 dark:text-white hover:text-purple-400 transition-colors"
                    >
                      {card.website}
                    </a>
                  </div>
                </div>
              )}

              {card.address && (
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-3 p-4 bg-white/5 dark:bg-white/5 rounded-xl mb-4">
                    <MapPinIcon className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{t('address') || 'Adresse'}</div>
                      <div className="text-gray-900 dark:text-white">
                        {card.address}
                      </div>
                    </div>
                  </div>
                  
                  {/* Google Maps Intégration */}
                  <div className="relative h-64 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 border border-white/10">
                    <iframe
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(card.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Localisation: ${card.address}`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    ></iframe>
                    
                    {/* Fallback si Google Maps ne charge pas */}
                    <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                      <div className="text-center">
                        <MapPinIcon className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                        <p className="text-gray-700 dark:text-gray-300 font-medium">
                          Localisation
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {card.address}
                        </p>
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(card.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Ouvrir dans Google Maps
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {card.company && (
                <div className="flex items-center space-x-3 p-4 bg-white/5 dark:bg-white/5 rounded-xl">
                  <BuildingOfficeIcon className="w-5 h-5 text-orange-400" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Entreprise</div>
                    <div className="text-gray-900 dark:text-white">
                      {card.company}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Statistiques */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-300 dark:border-white/10">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <EyeIcon className="w-4 h-4" />
                  <span className="text-sm">{views} {t('views') || 'vues'}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <HeartIcon className="w-4 h-4" />
                  <span className="text-sm">{likes} {t('likes') || 'likes'}</span>
                </div>
                {card.createdAt && (
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <span className="w-4 h-4">📅</span>
                    <span className="text-sm">
                      {t('createdOn') || 'Créée le'} {new Date(card.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                )}
              </div>

              {card.owner && (
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <UserIcon className="w-4 h-4" />
                  <span className="text-sm">{t('by') || 'Par'} {card.owner.firstName || card.owner.name}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Section Commentaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-3xl p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('comments') || 'Commentaires'} ({comments.length})
          </h3>

          {/* Formulaire d'ajout de commentaire */}
          {isAuthenticated && (
            <div className="mb-6">
              <div className="flex flex-col space-y-3">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={t('addComment') || 'Ajouter un commentaire...'}
                  className="w-full p-4 bg-white/10 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  disabled={isSubmittingComment}
                />
                <div className="flex justify-end">
                  <ButtonGlass
                    onClick={handleAddComment}
                    disabled={isSubmittingComment || !newComment.trim()}
                    size="sm"
                  >
                    {isSubmittingComment ? (t('submitting') || 'Envoi...') : (t('addComment') || 'Ajouter')}
                  </ButtonGlass>
                </div>
              </div>
            </div>
          )}

          {/* Liste des commentaires */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>{t('noComments') || 'Aucun commentaire pour le moment.'}</p>
                {!isAuthenticated && (
                  <p className="mt-2 text-sm">
                    <Link to="/login" className="text-blue-400 hover:text-blue-300">
                      {t('loginToComment') || 'Connectez-vous pour commenter'}
                    </Link>
                  </p>
                )}
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="bg-white/5 dark:bg-white/5 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-medium">
                        {comment.author.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {comment.author.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-4 justify-center"
        >
          <Link to="/cards">
            <ButtonGlass variant="secondary">
              {t('seeOtherCards') || 'Voir d\'autres cartes'}
            </ButtonGlass>
          </Link>
          
          {isAuthenticated && (
            <Link to="/create-card">
              <ButtonGlass>
                {t('createMyCard') || 'Créer ma carte'}
              </ButtonGlass>
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CardDetailsPage;
