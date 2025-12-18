import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiLoader, FiFilter } from 'react-icons/fi';
import api from '../../services/api'; // chamando a api configurada
import LeafletMap from '../../components/Map/LeafletMap';
import LeafletMarkers from '../../components/Map/LeafletMarkers';

export default function MapScreen() {
  const navigate = useNavigate();
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');

  // Baseado no LocalController e no formulário de cadastro
  const categorias = [
    'Todos',
    'Bares',
    'Ar Livre',
    'Cultura',
    'Histórico'
  ];

  // Busca os locais do backend ao carregar a tela
  useEffect(() => {
    const carregarLocais = async () => {
      try {
        setLoading(true);
        const response = await api.get('/locais');
        
        // Formata os dados para o LeafletMarkers 
        const marcadoresFormatados = response.data.map(local => ({
          id: local._id,
          lat: local.latitude,
          lng: local.longitude,
          title: local.nome,
          description: local.tipo,
          tipo: local.tipo
        }));
        
        setLocais(marcadoresFormatados);
      } catch (error) {
        console.error("Erro ao carregar marcadores do mapa:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarLocais();
  }, []);

  // Filtra os marcadores pela categoria selecionada
  const marcadoresFiltrados = filtroAtivo === 'Todos' 
    ? locais 
    : locais.filter(m => m.tipo === filtroAtivo);

  const handleMarkerClick = (marker) => {
    navigate(`/app/local/${marker.id}`); // Navega para a tela de detalhes do local
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      
      {/* FILTROS */}
      <div className="absolute top-4 left-0 right-0 z-[1000] px-4">
        <div 
          className="flex gap-3 overflow-x-auto pb-2 no-scrollbar"
        >
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltroAtivo(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-all border 
                ${filtroAtivo === cat 
                  ? 'bg-cyan-500 text-white border-cyan-500' 
                  : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MAPA  */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full bg-gray-50">
          <FiLoader className="animate-spin text-cyan-500 mb-2" size={32} />
          <p className="text-gray-500 font-medium">Carregando mapa cultural...</p>
        </div>
      ) : (
        <LeafletMap>
          <LeafletMarkers 
            markers={marcadoresFiltrados} 
            onMarkerClick={handleMarkerClick}
          />
        </LeafletMap>
      )}

      {/* BOTÃO PARA ADICIONAR LOCAL  */}
      <button
        onClick={() => navigate('/app/adicionar-local')}
        className="fixed bottom-24 right-6 z-[1000] 
                   bg-orange-500 text-white rounded-full w-14 h-14 
                   flex items-center justify-center shadow-2xl 
                   hover:scale-110 hover:bg-orange-600 active:scale-95 transition-all duration-300"
        title="Cadastrar novo local (+10 pontos!)"
      >
        <FiPlus size={28} />
      </button>

      {/* QUANTIDADE */}
      {!loading && (
        <div className="absolute bottom-28 left-6 z-[1000] bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {marcadoresFiltrados.length} locais encontrados
          </p>
        </div>
      )}
    </div>
  );
}
