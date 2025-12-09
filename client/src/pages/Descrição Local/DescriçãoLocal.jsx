import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHeart, FiStar, FiMapPin, FiShare2, FiClock } from 'react-icons/fi';

export default function DetalhesLocalScreen() {
  const { id } = useParams(); // Pega o ID do local da URL
  const navigate = useNavigate();

  // Estados locais para curtidas e favoritos
  const [curtido, setCurtido] = useState(false);
  const [favorito, setFavorito] = useState(false);
  const [contadorCurtidas, setContadorCurtidas] = useState(128); // Começa com 128 curtidas fake

  // Dados simulados do local (ainda sem backend)
  const localData = {
    id: id,
    nome: 'Sovaj Veg Bar',
    tipo: 'Gastronomia • Bar',
    endereco: 'Rua da Glória, 123 - Boa Vista, Recife',
    descricao: 'Um bar vegano com uma vibe maravilhosa no coração da Boa Vista. Perfeito para happy hour agradável, tem coxinha de jaca e cerveja gelada. O ambiente é cheio de plantas e toca música alt brasileira.',
    imagem: 'https://imagens.ne10.uol.com.br/veiculos/_midias/jpg/2024/10/02/img_4476-32921678.jpeg',
    autor: 'Clara Laranjeira',
    horario: 'Aberto hoje • 18:00 - 02:00'
  };

  // Para simular a lógica de curtir e favoritar
  const handleCurtir = () => {
    setCurtido(!curtido);
    setContadorCurtidas(prev => curtido ? prev - 1 : prev + 1);
    
    // Aqui eu enviaria a requisição para o backend
  };

  const handleFavoritar = () => {
    setFavorito(!favorito);
    
    // Aqui eu enviaria a requisição para o backend
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-inter">
      
      {/* Header com imagem */}
      <div className="relative w-full h-80 bg-gray-200">
        <img 
          src={localData.imagem} 
          alt={localData.nome} 
          className="w-full h-full object-cover"
        />
        
        {/* Para os ícones brancos aparecerem */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40"></div>

        {/* Botão de voltar */}
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-4 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition z-10"
        >
          <FiArrowLeft size={24} />
        </button>
      </div>

      {/* Card arredondado que sobe na imagem) */}
      <div className="relative -mt-10 bg-white rounded-t-[32px] px-6 pt-8 shadow-sm">
        
        {/* Nome e tipo */}
        <div className="mb-5">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-3 uppercase tracking-wide border border-blue-100">
            {localData.tipo}
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
            {localData.nome}
          </h1>
        </div>

        {/* Endereço e horário */}
        <div className="flex flex-col gap-3 mb-8 text-gray-600 text-sm">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 min-w-[20px] text-[#00bcd4]">
                <FiMapPin size={20} />
            </div>
            <span>{localData.endereco}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="min-w-[20px] text-[#00bcd4]">
                <FiClock size={20} />
            </div>
            <span>{localData.horario}</span>
          </div>
        </div>

        {/* Curtir e favoritar */}
        <div className="flex gap-4 mb-8 border-b border-gray-100 pb-8">
          
          {/* Botão de curtir */}
          <button 
            onClick={handleCurtir}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-2xl border-2 transition active:scale-95 
              border-red-200 text-red-500 
              ${curtido ? 'bg-red-50' : 'bg-white hover:bg-red-50'}`}
          >
            {/* ternário que deixa o coração preenchido quando está curtido */}
            <FiHeart size={24} fill={curtido ? "currentColor" : "none"} />
            
            <span className="text-sm font-semibold">
              {curtido ? 'Curtido' : 'Curtir'}
              <span className="ml-1 font-normal opacity-70">({contadorCurtidas})</span>
            </span>
          </button>

          {/* Botão de favoritar */}
          <button 
            onClick={handleFavoritar}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-2xl border-2 transition active:scale-95 
              border-blue-200 text-blue-500 
              ${favorito ? 'bg-blue-50' : 'bg-white hover:bg-blue-50'}`}
          >
            {/* ternário que deixa o coração preenchido quando está favoritado */}
            <FiStar size={24} fill={favorito ? "currentColor" : "none"} />
            
            <span className="text-sm font-semibold">
              {favorito ? 'Salvo' : 'Favoritar'}
            </span>
          </button>

        </div>

        {/* Descrição do local */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Sobre este lugar</h3>
          <p className="text-gray-600 leading-relaxed text-base text-justify">
            {localData.descricao}
          </p>
        </div>

        {/* Quem indicou o local */}
        <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100 mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
              <img 
                src={`https://ui-avatars.com/api/?name=${localData.autor}&background=random&color=fff`} 
                alt="Avatar autor" 
                className="w-full h-full object-cover"
              />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wide">Indicado por</p>
            <p className="text-gray-800 font-semibold">{localData.autor}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
