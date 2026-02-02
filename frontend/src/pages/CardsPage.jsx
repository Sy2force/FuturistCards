import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { 
  PlusIcon, FunnelIcon, MagnifyingGlassIcon, HeartIcon, EyeIcon, TrashIcon, 
  PencilIcon, ArrowPathIcon, XMarkIcon, CheckIcon 
} from '@heroicons/react/24/outline';
import LikeButton from '../components/ui/LikeButton';
import toast from 'react-hot-toast';

const API_URL = 'https://futuristcards.onrender.com/api';

// Edit Card Modal (Admin only)
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
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Subtitle</label>
            <input type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Phone</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20">Cancel</button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2">
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-red-500/30" onClick={e => e.stopPropagation()}>
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrashIcon className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Delete Card?</h3>
          <p className="text-gray-400 mb-6">
            Are you sure you want to delete <span className="text-white font-medium">"{card?.title || card?.fullName}"</span>?
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20">Cancel</button>
          <button onClick={handleDelete} disabled={deleting}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">
            {deleting ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : <TrashIcon className="w-5 h-5" />}
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CardsPage = () => {
  const { user } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  const loadCards = async (showToast = false) => {
    setRefreshing(true);
    try {
      const res = await fetch(`${API_URL}/cards`);
      if (res.ok) {
        const data = await res.json();
        setCards(data.cards || data || []);
      }
      setLastUpdate(new Date());
      if (showToast) toast.success('Cards refreshed!');
    } catch (error) {
      if (showToast) toast.error('Failed to refresh');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCards();
    const interval = setInterval(() => loadCards(), 30000);
    return () => clearInterval(interval);
  }, []);

  // Edit card (admin only)
  const handleEditCard = async (updatedCard) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/cards/${updatedCard._id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCard)
      });
      if (res.ok) {
        setCards(prev => prev.map(c => c._id === updatedCard._id ? { ...c, ...updatedCard } : c));
        toast.success('Card updated!');
      } else {
        toast.error('Failed to update');
      }
    } catch (e) {
      toast.error('Failed to update');
    }
    setEditModal(null);
  };

  // Delete card (admin only)
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
        toast.error('Failed to delete');
      }
    } catch (e) {
      toast.error('Failed to delete');
    }
    setDeleteModal(null);
  };

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'technology', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'business', label: 'Business' },
    { value: 'finance', label: 'Finance' },
    { value: 'medical', label: 'Medical' },
    { value: 'education', label: 'Education' },
    { value: 'legal', label: 'Legal' }
  ];

  const filteredCards = cards.filter(card => {
    const matchesSearch = (card.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (card.subtitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (card.company || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest': return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case 'oldest': return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      case 'mostViewed': return (b.views || 0) - (a.views || 0);
      case 'mostLiked': return (b.likes?.length || b.likes || 0) - (a.likes?.length || a.likes || 0);
      default: return 0;
    }
  });

  const isFavorite = (cardId) => favorites.some(fav => fav._id === cardId || fav.cardId === cardId);

  return (
    <>
      <Helmet>
        <title>Business Cards - FuturistCards</title>
      </Helmet>

      <AnimatePresence>
        {editModal && <EditCardModal card={editModal} onClose={() => setEditModal(null)} onSave={handleEditCard} />}
        {deleteModal && <DeleteModal card={deleteModal} onClose={() => setDeleteModal(null)} onConfirm={handleDeleteCard} />}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 text-white">Discover Cards</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-4">
              Explore our collection of professional digital business cards
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-xs text-green-400">Live - Last update: {lastUpdate.toLocaleTimeString()}</p>
              </div>
              <motion.button onClick={() => loadCards(true)} disabled={refreshing}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm">
                <ArrowPathIcon className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </motion.button>
            </div>
            <Link to="/create-card" className="inline-flex items-center px-6 py-3 mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
              <PlusIcon className="w-5 h-5 mr-2" />
              Create New Card
            </Link>
          </motion.div>

          {/* Search and Filters */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
              <div className="relative flex-1 max-w-lg">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="text" placeholder="Search cards..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border bg-black/20 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">{filteredCards.length} cards found</span>
                <button onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border bg-black/20 border-white/20 text-white hover:bg-black/30">
                  <FunnelIcon className="w-5 h-5" />
                  Filters
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden">
                  <div className="p-6 rounded-xl border bg-black/30 border-white/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Category</label>
                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border bg-black/20 border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          {categories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Sort By</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border bg-black/20 border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="newest">Newest</option>
                          <option value="oldest">Oldest</option>
                          <option value="mostViewed">Most Viewed</option>
                          <option value="mostLiked">Most Liked</option>
                        </select>
                      </div>
                    </div>
                    {(searchTerm || selectedCategory !== 'all') && (
                      <button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSortBy('newest'); }}
                        className="mt-4 text-blue-400 hover:text-blue-300 font-medium text-sm">
                        Clear Filters
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            </div>
          )}

          {/* Cards Grid */}
          {!loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.map((card, index) => (
                <motion.div key={card._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * index }}
                  className="relative group bg-black/20 border-white/20 rounded-2xl border backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all overflow-hidden hover:-translate-y-2">
                  
                  {/* Card Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {card.image ? (
                      <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-6xl font-bold text-white">{(card.title || 'C').charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <LikeButton cardId={card._id} size="sm" showCount={false}
                        onLikeChange={(data) => setCards(prev => prev.map(c => c._id === card._id ? { ...c, likes: data.likesCount } : c))} />
                    </div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-black/40 backdrop-blur-sm text-white">
                        {card.category || 'General'}
                      </span>
                      {card.isDemo && (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500/80 text-black">
                          Demo
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <Link to={`/cards/${card._id}`} className="block p-6">
                    <h3 className="font-bold text-xl mb-2 text-white line-clamp-2">{card.title || card.fullName || 'Untitled'}</h3>
                    <p className="text-base text-gray-300 line-clamp-1 mb-3">{card.subtitle || ''}</p>
                    {card.description && <p className="text-sm text-gray-400 line-clamp-2 mb-4">{card.description}</p>}
                  </Link>

                  {/* Stats Footer */}
                  <div className="px-6 pb-6 flex items-center justify-between text-sm border-t border-white/10 pt-4 text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><EyeIcon className="w-4 h-4 text-green-500" />{card.views || 0}</span>
                      <span className="flex items-center gap-1"><HeartIcon className="w-4 h-4 text-red-500" />{card.likes?.length || card.likes || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {user?.role === 'admin' && (
                        <>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                            onClick={(e) => { e.preventDefault(); setEditModal(card); }}
                            className="p-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30" title="Edit">
                            <PencilIcon className="w-4 h-4" />
                          </motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                            onClick={(e) => { e.preventDefault(); setDeleteModal(card); }}
                            className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30" title="Delete">
                            <TrashIcon className="w-4 h-4" />
                          </motion.button>
                        </>
                      )}
                      <Link to={`/cards/${card._id}`}>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 rounded-lg text-xs font-medium bg-purple-600/20 text-purple-400 hover:bg-purple-600/30">
                          View
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && filteredCards.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
              <div className="text-8xl mb-6 text-gray-600">{searchTerm || selectedCategory !== 'all' ? '🔍' : '📇'}</div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {searchTerm || selectedCategory !== 'all' ? 'No Results Found' : 'No Cards Available'}
              </h3>
              <p className="text-lg text-gray-400 mb-8">
                {searchTerm || selectedCategory !== 'all' ? 'Try adjusting your search' : 'Be the first to create a card'}
              </p>
              <Link to="/create-card" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg">
                <PlusIcon className="w-5 h-5 mr-2" />
                Create New Card
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default CardsPage;
