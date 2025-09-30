import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditCardPageSimple = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Modifier la carte #{id}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Fonctionnalité en cours de développement
        </p>
        <button 
          onClick={() => navigate('/my-cards')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Retour à mes cartes
        </button>
      </div>
    </div>
  );
};

export default EditCardPageSimple;
