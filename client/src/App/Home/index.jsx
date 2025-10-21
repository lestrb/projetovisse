import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Log Tour
      </h1>
      <button 
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={() => navigate('/test')}>
        Navegar
      </button>
    </div>
  );
}

export default Home;

