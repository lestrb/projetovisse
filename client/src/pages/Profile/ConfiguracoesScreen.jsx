import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBell, FiMoon, FiDollarSign, FiTrash2, FiChevronRight } from 'react-icons/fi';

export default function ConfiguracoesScreen() {
  const navigate = useNavigate();
  
  // Estado para o toggle de notificações
  const [notificacoes, setNotificacoes] = useState(true);

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-inter">
      {/* Header */}
      <header className="flex items-center p-4 bg-white shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
        >
          <FiArrowLeft size={24} />
        </button>
        <h1 className="ml-4 text-xl font-bold text-gray-800">Configurações</h1>
      </header>

      <div className="p-4 max-w-md mx-auto flex flex-col gap-6">
        
        {/* Seção: conversão pontos-moedas */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase mb-2 ml-1">Carteira Capiba</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button 
              onClick={() => navigate('/app/conversao')}
              className="w-full flex items-center justify-between p-4 hover:bg-orange-50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg group-hover:bg-orange-200 transition">
                  <FiDollarSign size={22} />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">Converter pontos</p>
                  <p className="text-xs text-gray-500">Troque seus pontos por moedas capiba</p>
                </div>
              </div>
              <FiChevronRight className="text-gray-400" />
            </button>
          </div>
        </section>

        {/* Seção: exclusão de perfil */}
        <section>
          <button 
            onClick={() => { if(window.confirm("Tem certeza que deseja excluir sua conta?")) console.log("Conta excluída"); }}
            className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-medium hover:bg-red-50 rounded-xl transition border border-transparent hover:border-red-100"
          >
            <FiTrash2 size={18} />
            Excluir minha conta
          </button>
          
        </section>

      </div>
    </div>
  );
}