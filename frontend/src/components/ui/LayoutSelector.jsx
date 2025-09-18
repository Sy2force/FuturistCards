import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const LayoutSelector = ({ layout, onChange }) => {
  const layouts = [
    {
      id: 'grid',
      name: 'Grid View',
      icon: '⊞',
      description: 'Cards in a responsive grid'
    },
    {
      id: 'table',
      name: 'Table View',
      icon: '☰',
      description: 'Organized in rows and columns'
    },
    {
      id: 'compact',
      name: 'Compact View',
      icon: '▤',
      description: 'Dense list format'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-2">
      {layouts.map((layoutOption) => (
        <button
          key={layoutOption.id}
          onClick={() => onChange(layoutOption.id)}
          className={`p-3 rounded-lg border transition-all duration-200 text-left ${
            layout === layoutOption.id
              ? 'bg-primary-500/30 border-primary-400/50'
              : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl">{layoutOption.icon}</div>
            <div>
              <div className="font-medium text-white">{layoutOption.name}</div>
              <div className="text-sm text-white/60">{layoutOption.description}</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default LayoutSelector;
