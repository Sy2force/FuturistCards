// ContactPage - Page de contact détaillée pour une carte spécifique
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  GlobeAltIcon,
  ArrowLeftIcon,
  ShareIcon,
  HeartIcon,
  StarIcon,
  BuildingOfficeIcon,
  UserIcon
} from '@heroicons/react/24/outline';
// import { cards as cardsAPI } from '../services/cards'; // Unused - using localStorage instead
import LoadingSpinner from '../components/common/LoadingSpinner';
import ButtonGlass from '../components/common/ButtonGlass';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sendingMessage, setSendingMessage] = useState(false);

  const loadCard = useCallback(async () => {
    try {
      setLoading(true);
      
      // Mode mock - charger depuis localStorage
      const mockCards = JSON.parse(localStorage.getItem('mockCards') || '[]');
      const userCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      const allCards = [...mockCards, ...userCards];
      
      const foundCard = allCards.find(c => c._id === id);
      
      if (!foundCard) {
        toast.error('Carte introuvable');
        navigate('/cards');
        return;
      }
      
      setCard(foundCard);
    } catch (error) {
      toast.error('Carte introuvable');
      navigate('/cards');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (id) {
      loadCard();
    }
  }, [id, loadCard]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setSendingMessage(true);
      // Simuler l'envoi du message
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Message envoyé avec succès !');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du message');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: card.title,
        text: card.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Lien copié dans le presse-papiers');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Carte introuvable</h2>
          <ButtonGlass onClick={() => navigate('/cards')}>
            Retour aux cartes
          </ButtonGlass>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Bouton retour */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <ButtonGlass
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Retour
          </ButtonGlass>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informations de la carte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            {/* Image et infos principales */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <img
                  src={card.image || 'https://picsum.photos/400/300?random=3'}
                  alt={card.title}
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500/30"
                />
                <div className="absolute -top-2 -right-2">
                  <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                    {card.category}
                  </span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-2">{card.title}</h1>
              {card.subtitle && (
                <p className="text-xl text-blue-400 mb-2">{card.subtitle}</p>
              )}
              
              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(card.rating || 4.5) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-600'
                    }`}
                  />
                ))}
                <span className="text-gray-400 ml-2">({card.rating || 4.5})</span>
              </div>

              <p className="text-gray-300 leading-relaxed">{card.description}</p>
            </div>

            {/* Informations de contact */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                Informations de contact
              </h3>

              {card.email && (
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <EnvelopeIcon className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a 
                      href={`mailto:${card.email}`}
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      {card.email}
                    </a>
                  </div>
                </div>
              )}

              {card.phone && (
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <PhoneIcon className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Téléphone</p>
                    <a 
                      href={`tel:${card.phone}`}
                      className="text-white hover:text-green-400 transition-colors"
                    >
                      {card.phone}
                    </a>
                  </div>
                </div>
              )}

              {(card.web || card.website) && (
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <GlobeAltIcon className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Site web</p>
                    <a 
                      href={card.web || card.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-purple-400 transition-colors"
                    >
                      {card.web || card.website}
                    </a>
                  </div>
                </div>
              )}

              {card.address && (
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <MapPinIcon className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Adresse</p>
                    <p className="text-white">{card.address}</p>
                  </div>
                </div>
              )}

              {(card.company || card.subtitle) && (
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <BuildingOfficeIcon className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Entreprise</p>
                    <p className="text-white">{card.company || card.subtitle}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-8">
              <ButtonGlass
                onClick={handleShare}
                className="flex items-center gap-2 flex-1"
                variant="secondary"
              >
                <ShareIcon className="w-4 h-4" />
                Partager
              </ButtonGlass>
              
              <ButtonGlass
                className="flex items-center gap-2 flex-1"
                variant="secondary"
              >
                <HeartIcon className="w-4 h-4" />
                Favoris
              </ButtonGlass>
            </div>
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Envoyer un message</h3>
            
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <ButtonGlass
                type="submit"
                disabled={sendingMessage}
                className="w-full"
                size="lg"
              >
                {sendingMessage ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <EnvelopeIcon className="w-5 h-5 mr-2" />
                    Envoyer le message
                  </>
                )}
              </ButtonGlass>
            </form>

            {/* Informations supplémentaires */}
            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-300 text-sm">
                💡 <strong>Conseil :</strong> Soyez précis dans votre message pour obtenir une réponse rapide et pertinente.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
