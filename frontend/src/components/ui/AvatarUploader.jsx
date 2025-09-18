import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

const AvatarUploader = ({ currentAvatar, onAvatarChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentAvatar);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      setPreviewUrl(base64);
      onAvatarChange(base64);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPreviewUrl(url);
    onAvatarChange(url);
  };

  const removeAvatar = () => {
    setPreviewUrl('');
    onAvatarChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getInitials = () => {
    // This would normally come from user name, but for demo we'll use placeholder
    return 'FC';
  };

  return (
    <div className="space-y-4">
      {/* Avatar Preview */}
      <div className="flex items-center gap-4">
        <div className="relative">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Avatar preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 
                          flex items-center justify-center text-white font-bold text-xl border-2 border-white/20">
              {getInitials()}
            </div>
          )}
          
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        <div className="flex-1">
          <p className="text-sm text-white/80 mb-2">Profile Picture</p>
          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-3 py-1 text-sm bg-primary-500/30 border border-primary-400/50 
                       rounded-lg text-white hover:bg-primary-500/40 transition-colors duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload
            </button>
            
            {previewUrl && (
              <button
                onClick={removeAvatar}
                disabled={isUploading}
                className="px-3 py-1 text-sm bg-red-500/30 border border-red-400/50 
                         rounded-lg text-white hover:bg-red-500/40 transition-colors duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* URL Input */}
      <div>
        <label className="block text-sm text-white/70 mb-2">
          Or paste image URL:
        </label>
        <input
          type="url"
          value={previewUrl || ''}
          onChange={handleUrlChange}
          placeholder="https://example.com/avatar.jpg"
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg 
                   text-white text-sm placeholder-white/50 focus:outline-none focus:border-primary-400
                   focus:ring-2 focus:ring-primary-400/20 transition-all duration-200"
        />
      </div>

      <p className="text-xs text-white/50">
        Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB
      </p>
    </div>
  );
};

export default AvatarUploader;
