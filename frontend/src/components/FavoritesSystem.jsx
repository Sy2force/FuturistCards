import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookmarkIcon, 
  HeartIcon,
  FolderIcon,
  PlusIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  StarIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

const FavoritesSystem = ({ cardId, initialIsFavorite = false, onFavoriteChange }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [showCollections, setShowCollections] = useState(false);
  const [collections, setCollections] = useState([
    { id: 1, name: 'Technologie', count: 12, color: 'from-blue-500 to-cyan-500' },
    { id: 2, name: 'Design', count: 8, color: 'from-purple-500 to-pink-500' },
    { id: 3, name: 'Business', count: 15, color: 'from-green-500 to-emerald-500' },
    { id: 4, name: 'Favoris', count: 23, color: 'from-yellow-500 to-orange-500' }
  ]);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [showNewCollection, setShowNewCollection] = useState(false);

  const handleFavoriteToggle = async () => {
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    
    try {
      await onFavoriteChange?.(cardId, newIsFavorite);
    } catch (error) {
      setIsFavorite(!newIsFavorite);
    }
  };

  const handleAddToCollection = async (collectionId) => {
    try {
      // Add to collection logic here
      setShowCollections(false);
    } catch (error) {
      console.error('Error adding to collection:', error);
    }
  };

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      const newCollection = {
        id: Date.now(),
        name: newCollectionName,
        count: 0,
        color: 'from-indigo-500 to-purple-500'
      };
      setCollections(prev => [...prev, newCollection]);
      setNewCollectionName('');
      setShowNewCollection(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        {/* Simple Favorite Button */}
        <motion.button
          onClick={handleFavoriteToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-1"
        >
          <AnimatePresence mode="wait">
            {isFavorite ? (
              <motion.div
                key="favorited"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <BookmarkSolidIcon className="h-5 w-5 text-yellow-500" />
              </motion.div>
            ) : (
              <motion.div
                key="not-favorited"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <BookmarkIcon className="h-5 w-5 text-white/60 hover:text-yellow-400 transition-colors" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Collections Button */}
        <motion.button
          onClick={() => setShowCollections(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-white/60 hover:text-white transition-colors"
        >
          <FolderIcon className="h-4 w-4" />
        </motion.button>
      </div>

      {/* Collections Modal */}
      <AnimatePresence>
        {showCollections && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCollections(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md glass border border-white/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Ajouter à une collection</h3>
                <button
                  onClick={() => setShowCollections(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Search Collections */}
              <div className="relative mb-4">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Rechercher une collection..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Collections List */}
              <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                {collections.map((collection) => (
                  <motion.button
                    key={collection.id}
                    onClick={() => handleAddToCollection(collection.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${collection.color} flex items-center justify-center`}>
                        <FolderIcon className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-white font-medium">{collection.name}</div>
                        <div className="text-white/60 text-xs">{collection.count} cartes</div>
                      </div>
                    </div>
                    <PlusIcon className="h-4 w-4 text-white/60" />
                  </motion.button>
                ))}
              </div>

              {/* Create New Collection */}
              <div className="border-t border-white/20 pt-4">
                {showNewCollection ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={newCollectionName}
                      onChange={(e) => setNewCollectionName(e.target.value)}
                      placeholder="Nom de la nouvelle collection"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      autoFocus
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleCreateCollection}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
                      >
                        Créer
                      </button>
                      <button
                        onClick={() => {
                          setShowNewCollection(false);
                          setNewCollectionName('');
                        }}
                        className="flex-1 bg-white/10 text-white py-2 rounded-lg hover:bg-white/20 transition-colors"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowNewCollection(true)}
                    className="w-full flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-white/30 rounded-lg text-white/70 hover:text-white hover:border-white/50 transition-colors"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>Nouvelle collection</span>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FavoritesSystem;
