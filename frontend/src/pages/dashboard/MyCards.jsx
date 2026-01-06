import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../context/AuthContext';
import {
  PlusIcon,
  EyeIcon,
  HeartIcon,
  TrashIcon,
  PencilIcon,
  ShareIcon,
  XMarkIcon,
  CheckIcon,
  ArrowPathIcon,
  ChartBarIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import GlassCard from '../../components/ui/GlassCard';
import GlassButton from '../../components/ui/GlassButton';
import toast from 'react-hot-toast';

const API_URL = 'https://futuristcards.onrender.com/api';

// Edit Card Modal
const EditCardModal = ({ card, onClose, onSave }) => {
  const [title, setTitle] = useState(card?.title || card?.fullName || '');
  const [subtitle, setSubtitle] = useState(card?.subtitle || '');
  const [description, setDescription] = useState(card?.description || '');
  const [email, setEmail] = useState(card?.email || '');
  const [phone, setPhone] = useState(card?.phone || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave({ ...card, title, fullName: title, subtitle, description, email, phone });
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-white/20 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Edit Card</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : <CheckIcon className="w-5 h-5" />}
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Delete Modal
const DeleteModal = ({ card, onClose, onConfirm }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onConfirm();
    setDeleting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-red-500/30"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrashIcon className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Delete Card?</h3>
          <p className="text-gray-400 mb-6">
            Are you sure you want to delete <span className="text-white font-medium">"{card?.title || card?.fullName}"</span>?
            This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {deleting ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : <TrashIcon className="w-5 h-5" />}
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MyCardsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  const fetchMyCards = useCallback(async (showToast = false) => {
    setRefreshing(true);
    try {
      // Fetch from API
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/cards/my-cards`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      
      let serverCards = [];
      if (res.ok) {
        const data = await res.json();
        serverCards = data.cards || data || [];
      }

      // Also get local cards
      const localCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      
      // Merge cards (avoid duplicates)
      const allCards = [...serverCards];
      localCards.forEach(lc => {
        if (!allCards.find(c => c._id === lc.id || c._id === lc._id)) {
          allCards.push({ ...lc, _id: lc.id || lc._id });
        }
      });

      setCards(allCards);
      setLastUpdate(new Date());
      if (showToast) toast.success('Cards refreshed!');
    } catch (error) {
      // Fallback to local cards
      const localCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      setCards(localCards.map(c => ({ ...c, _id: c.id || c._id })));
      if (showToast) toast.error('Using offline data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMyCards();
    const interval = setInterval(() => fetchMyCards(), 30000);
    return () => clearInterval(interval);
  }, [fetchMyCards]);

  // Edit card handler
  const handleEditCard = async (updatedCard) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/cards/${updatedCard._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCard)
      });

      if (res.ok) {
        setCards(prev => prev.map(c => c._id === updatedCard._id ? { ...c, ...updatedCard } : c));
        toast.success('Card updated!');
      } else {
        // Update locally
        setCards(prev => prev.map(c => c._id === updatedCard._id ? { ...c, ...updatedCard } : c));
        const localCards = JSON.parse(localStorage.getItem('userCards') || '[]');
        const updated = localCards.map(c => (c.id === updatedCard._id || c._id === updatedCard._id) ? { ...c, ...updatedCard } : c);
        localStorage.setItem('userCards', JSON.stringify(updated));
        toast.success('Card updated locally!');
      }
    } catch (e) {
      setCards(prev => prev.map(c => c._id === updatedCard._id ? { ...c, ...updatedCard } : c));
      toast.success('Card updated locally!');
    }
    setEditModal(null);
  };

  // Delete card handler
  const handleDeleteCard = async () => {
    const cardId = deleteModal?._id;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/cards/${cardId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        setCards(prev => prev.filter(c => c._id !== cardId));
        toast.success('Card deleted!');
      } else {
        throw new Error('API failed');
      }
    } catch (e) {
      // Delete locally
      setCards(prev => prev.filter(c => c._id !== cardId));
      const localCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      localStorage.setItem('userCards', JSON.stringify(localCards.filter(c => c.id !== cardId && c._id !== cardId)));
      toast.success('Card deleted locally!');
    }
    setDeleteModal(null);
  };

  const handleShareCard = (card) => {
    const url = `${window.location.origin}/cards/${card._id}`;
    if (navigator.share) {
      navigator.share({ title: card.title, text: card.description, url });
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Link copied!');
    }
  };

  const totalViews = cards.reduce((sum, c) => sum + (c.views || 0), 0);
  const totalLikes = cards.reduce((sum, c) => sum + (c.likes?.length || c.likes || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Cards - FuturistCards</title>
      </Helmet>

      <AnimatePresence>
        {editModal && <EditCardModal card={editModal} onClose={() => setEditModal(null)} onSave={handleEditCard} />}
        {deleteModal && <DeleteModal card={deleteModal} onClose={() => setDeleteModal(null)} onConfirm={handleDeleteCard} />}
      </AnimatePresence>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">My Cards</h1>
                <p className="text-gray-300">Manage your digital business cards</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-xs text-green-400">
                    Live - Last update: {lastUpdate.toLocaleTimeString()} - Auto-refresh: 30s
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={() => fetchMyCards(true)}
                  disabled={refreshing}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
                >
                  <ArrowPathIcon className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </motion.button>
                <Link to="/create-card">
                  <GlassButton className="flex items-center gap-2">
                    <PlusIcon className="h-5 w-5" />
                    Create New
                  </GlassButton>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Cards</p>
                  <p className="text-3xl font-bold text-white">{cards.length}</p>
                </div>
                <ChartBarIcon className="h-8 w-8 text-blue-400" />
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Views</p>
                  <p className="text-3xl font-bold text-white">{totalViews}</p>
                </div>
                <EyeIcon className="h-8 w-8 text-green-400" />
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Likes</p>
                  <p className="text-3xl font-bold text-white">{totalLikes}</p>
                </div>
                <HeartIcon className="h-8 w-8 text-red-400" />
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Avg Views</p>
                  <p className="text-3xl font-bold text-white">{cards.length > 0 ? (totalViews / cards.length).toFixed(1) : 0}</p>
                </div>
                <CalendarIcon className="h-8 w-8 text-purple-400" />
              </div>
            </GlassCard>
          </motion.div>

          {/* Cards Grid */}
          {cards.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
              <GlassCard className="p-12 max-w-md mx-auto">
                <PlusIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">No Cards Yet</h3>
                <p className="text-gray-300 mb-8">Create your first digital business card</p>
                <Link to="/create-card">
                  <GlassButton className="flex items-center mx-auto gap-2">
                    <PlusIcon className="h-5 w-5" />
                    Create Your First Card
                  </GlassButton>
                </Link>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card, index) => (
                <motion.div
                  key={card._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <GlassCard className="p-6 hover:scale-105 transition-all duration-300 group">
                    <div className="mb-4">
                      <div className="flex justify-between items-start mb-3">
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                          {card.category || 'General'}
                        </span>
                        <button onClick={() => handleShareCard(card)} className="text-gray-400 hover:text-blue-300">
                          <ShareIcon className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">{card.title || card.fullName || 'Untitled'}</h3>
                      <p className="text-blue-300 text-sm mb-3">{card.subtitle || card.email || ''}</p>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{card.description || ''}</p>
                      
                      <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center gap-1">
                            <EyeIcon className="h-4 w-4" />
                            {card.views || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <HeartIcon className="h-4 w-4" />
                            {card.likes?.length || card.likes || 0}
                          </span>
                        </div>
                        <span>{card.createdAt ? new Date(card.createdAt).toLocaleDateString() : 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setEditModal(card)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleShareCard(card)}
                        className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                        title="Share"
                      >
                        <ShareIcon className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setDeleteModal(card)}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </motion.button>
                      <Link to={`/cards/${card._id}`} className="flex-1">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm"
                        >
                          View Card
                        </motion.button>
                      </Link>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCardsPage;
