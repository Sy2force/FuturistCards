import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const FontSelector = ({ font, onChange }) => {
  const fonts = [
    { name: 'Inter', label: 'Inter', preview: 'Modern & Clean' },
    { name: 'Orbitron', label: 'Orbitron', preview: 'Futuristic' },
    { name: 'Roboto', label: 'Roboto', preview: 'Professional' },
    { name: 'Poppins', label: 'Poppins', preview: 'Friendly' },
    { name: 'Montserrat', label: 'Montserrat', preview: 'Elegant' }
  ];

  return (
    <div className="grid grid-cols-1 gap-2">
      {fonts.map((fontOption) => (
        <button
          key={fontOption.name}
          onClick={() => onChange(fontOption.name)}
          className={`p-3 rounded-lg border transition-all duration-200 text-left ${
            font === fontOption.name
              ? 'bg-primary-500/30 border-primary-400/50'
              : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div 
                className="font-medium text-white"
                style={{ fontFamily: fontOption.name === 'Orbitron' ? '"Orbitron", monospace' : `"${fontOption.name}", sans-serif` }}
              >
                {fontOption.label}
              </div>
              <div className="text-sm text-white/60">{fontOption.preview}</div>
            </div>
            <div 
              className="text-lg text-white/80"
              style={{ fontFamily: fontOption.name === 'Orbitron' ? '"Orbitron", monospace' : `"${fontOption.name}", sans-serif` }}
            >
              Aa
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default FontSelector;
