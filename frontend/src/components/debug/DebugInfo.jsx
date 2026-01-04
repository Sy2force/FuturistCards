import React from 'react';

const DebugInfo = () => {
  if (import.meta.env.PROD) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded text-xs z-50">
        <div>Environment: {import.meta.env.MODE}</div>
        <div>API URL: {import.meta.env.VITE_API_URL}</div>
        <div>Build Time: {new Date().toISOString()}</div>
        <div>Location: {window.location.href}</div>
      </div>
    );
  }
  return null;
};

export default DebugInfo;
