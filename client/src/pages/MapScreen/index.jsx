import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import LeafletMap from '../../components/Map/LeafletMap';
import LeafletMarkers from '../../components/Map/LeafletMarkers';

export default function MapScreen() {
  const navigate = useNavigate();
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');

  // Categorias
  const categorias = [
    'Todos',
    'Bares',
    'Ar Livre',
    'Cultura',
    'Histórico',
    'Gastronomia',
    'Feiras'
  ];

  // Dados Mockados
  const allMarkers = [
    { 
      id: '1', 
      lat: -8.0631, 
      lng: -34.8711, 
      title: 'Marco Zero', 
      description: 'Coração do Recife Antigo',
      tipo: 'Histórico'
    },
    { 
      id: '2', 
      lat: -8.0522, 
      lng: -34.8852, 
      title: 'Parque 13 de Maio', 
      description: 'Lazer e natureza',
      tipo: 'Ar Livre'
    },
    { 
      id: '3', 
      lat: -8.0450, 
      lng: -34.9000, 
      title: 'Mercado da Madalena', 
      description: 'Gastronomia regional',
      tipo: 'Gastronomia'
    },
    { 
      id: '4', 
      lat: -8.0580, 
      lng: -34.8720, 
      title: 'Sovaj Veg Bar', 
      description: 'Bar vegano na Boa Vista',
      tipo: 'Bares'
    }
  ];

  // Filtra os marcadores com base na categoria selecionada
  const markersFiltrados = filtroAtivo === 'Todos' 
    ? allMarkers 
    : allMarkers.filter(m => m.tipo === filtroAtivo);

  const handleMarkerClick = (marker) => {
    navigate(`/app/local/${marker.id}`);
  };

  return (
    <div className="relative w-full h-full">
      
      {/* FILTROS SUPERIORES */}
      <div className="absolute top-4 left-0 right-0 z-[1000] px-4">
        <div 
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
        >
          <style>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>

          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltroAtivo(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all border 
                ${filtroAtivo === cat 
                  ? 'bg-[#00bcd4] text-white border-[#00bcd4]' // Estilo Ativo (Azul Ciano)
                  : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50' // Estilo Inativo
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MAPA (fundo) */}
      <LeafletMap>
        <LeafletMarkers 
          markers={markersFiltrados} 
          onMarkerClick={handleMarkerClick}
        />
      </LeafletMap>

      {/*BOTÃO DE ADICIONAR (+) */}
      <button
        onClick={() => navigate('/app/adicionar-local')}
        className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-[1000] 
                   bg-[#ff7a00] text-white rounded-full w-16 h-16 
                   flex items-center justify-center shadow-xl 
                   hover:scale-110 hover:bg-[#e56d00] active:scale-95 transition-all duration-300
                   border-4 border-white"
        aria-label="Adicionar novo local"
      >
        <FiPlus size={32} />
      </button>

    </div>
  );
}
