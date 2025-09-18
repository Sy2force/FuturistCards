import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ColorPickerGlass = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const predefinedColors = [
    '#0ea5e9', // Sky blue
    '#3b82f6', // Blue
    '#8b5cf6', // Purple
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#84cc16', // Lime
    '#f97316', // Orange
    '#6366f1', // Indigo
    '#14b8a6'  // Teal
  ];

  const handleColorSelect = (selectedColor) => {
    onChange(selectedColor);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        {/* Color Preview */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-lg border-2 border-white/20 hover:border-white/40 
                   transition-all duration-200 relative overflow-hidden group"
          style={{ backgroundColor: color }}
        >
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
        </button>

        {/* Hex Input */}
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg 
                   text-white text-sm font-mono focus:outline-none focus:border-primary-400
                   focus:ring-2 focus:ring-primary-400/20 transition-all duration-200"
          placeholder="#0ea5e9"
          pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
        />

        {/* Color Picker Input */}
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer"
        />
      </div>

      {/* Predefined Colors Palette */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 p-4 bg-white/10 backdrop-filter backdrop-blur-lg 
                   border border-white/20 rounded-lg shadow-xl z-50"
        >
          <div className="grid grid-cols-6 gap-2">
            {predefinedColors.map((presetColor) => (
              <button
                key={presetColor}
                onClick={() => handleColorSelect(presetColor)}
                className="w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110
                         hover:border-white/60"
                style={{ 
                  backgroundColor: presetColor,
                  borderColor: color === presetColor ? '#fff' : 'rgba(255,255,255,0.2)'
                }}
                title={presetColor}
              />
            ))}
          </div>
          
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-xs text-white/60 text-center">
              Click a color or use the inputs above
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ColorPickerGlass;
