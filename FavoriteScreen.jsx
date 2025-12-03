import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiStar, FiMapPin, FiTrash2, FiHeart } from 'react-icons/fi';

const FavoriteScreen = () => {
  const navigate = useNavigate();

  // Dados mockados para simular o que viria do banco de dados
  // Quando integramos tudo, isso virá de um Context ou Redux
  const [favoritos, setFavoritos] = useState([
    {
      id: '1',
      nome: 'Sovaj Veg Bar',
      tipo: 'Gastronomia',
      endereco: 'Boa Vista, Recife',
      imagem: 'https://imagens.ne10.uol.com.br/veiculos/_midias/jpg/2024/10/02/img_4476-32921678.jpeg'
    },
    {
      id: '3',
      nome: 'Feira na Laje',
      tipo: 'Cultural',
      endereco: 'Morro da Conceição',
      imagem: 'https://cdn.folhape.com.br/img/pc/1100/1/dn_arquivo/2025/04/whatsapp-image-2025-04-04-at-184205.jpg'
    },
    {
      id: '2',
      nome: 'Rua da Feira',
      tipo: 'Lazer',
      endereco: 'Afogados, Recife',
      imagem: 'https://ton.x.com/i/ton/data/dm/1988061385616748852/1988061377458475008/f2eU1eTD.png:medium'
    }
  ]);

  // Função fictícia para remover um item (apenas visualmente no estado local)
  const removerFavorito = (e, id) => {
    e.preventDefault(); // Evita abrir o card ao clicar no botão de remover
    e.stopPropagation();
    setFavoritos(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="flex flex-col min-h-full pb-20">
      
      {/* Cabeçalho Interno */}
      <div className="flex items-center gap-4 p-4 bg-white shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 rounded-full hover:bg-gray-100 transition text-gray-600"
        >
          <FiArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Meus Favoritos</h1>
      </div>

      {/* Lista de Cards */}
      <div className="p-4 flex flex-col gap-4 max-w-2xl mx-auto w-full">
        
        {favoritos.length === 0 ? (
          // Estado Vazio
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
                <FiHeart size={48} className="text-gray-300" />
            </div>
            <p className="text-lg font-medium">Nenhum favorito ainda.</p>
            <p className="text-sm">Explore o mapa e salve seus lugares preferidos!</p>
            <Link to="/app/mapa" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition">
                Explorar Mapa
            </Link>
          </div>
        ) : (
          // Lista de Favoritos
          favoritos.map((local) => (
            <Link 
              to={`/app/local/${local.id}`} 
              key={local.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition transform active:scale-[0.99] duration-200"
            >
              {/* Imagem do Card */}
              <div className="h-40 sm:h-auto sm:w-40 bg-gray-200 relative">
                <img 
                  src={local.imagem} 
                  alt={local.nome} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Conteúdo do Card */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1">
                      {local.nome}
                    </h3>
                    {/* Botão de Remover (Lixeira) */}
                    <button 
                      onClick={(e) => removerFavorito(e, local.id)}
                      className="text-gray-400 hover:text-red-500 transition p-1"
                      title="Remover dos favoritos"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                  
                  <p className="text-sm text-blue-600 font-medium mb-1">{local.tipo}</p>
                  
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <FiMapPin size={14} />
                    <span>{local.endereco}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-sm text-orange-500 font-semibold flex items-center gap-1">
                        Ver detalhes →
                    </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoriteScreen;