import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';

export default function ConversaoCapibaScreen() {
  const navigate = useNavigate();
  
  // Saldo inicial (simulado)
  const [pontos, setPontos] = useState(2500); 
  const TAXA_CONVERSAO = 500; // 500 pts = 1 moeda
  
  const moedasPossiveis = Math.floor(pontos / TAXA_CONVERSAO);
  const sobra = pontos % TAXA_CONVERSAO;
  const [sucesso, setSucesso] = useState(false);

  const handleConverter = () => {
    if (moedasPossiveis <= 0) return;
    setSucesso(true);
    setTimeout(() => {
      setPontos(sobra);
      setSucesso(false);
    }, 2500);
  };

  // Tela de Sucesso (Feedback)
  if (sucesso) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <FiCheckCircle size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sucesso!</h2>
        <p className="text-gray-500">
          Você resgatou <span className="text-green-600 font-bold">{moedasPossiveis} moedas capiba</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-inter flex flex-col">
      
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex items-center sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
        >
          <FiArrowLeft size={24} />
        </button>
        <h1 className="ml-4 text-lg font-bold text-gray-800">Carteira Digital</h1>
      </header>

      <main className="flex-1 p-6 flex flex-col items-center max-w-md mx-auto w-full">
        
        {/* Área de saldo */}
        <div className="mt-4 mb-8 text-center">
          <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Seu saldo atual</span>
          <div className="flex items-center justify-center gap-2 mt-2">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00bcd4] to-blue-600">
              {pontos}
            </h1>
            <span className="text-xl text-gray-400 font-medium mt-3">pts</span>
          </div>
        </div>

        {/* Card de conversão */}
        <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 text-lg">Trocar por Moedas</h3>
            <div className="bg-orange-50 text-orange-600 p-2 rounded-lg">
                <FiRefreshCw size={20} />
            </div>
          </div>

          {/* Info de conversão */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
              <span className="text-gray-600 text-sm">Disponível para saque</span>
              <span className="text-2xl font-bold text-gray-900">{moedasPossiveis} <span className="text-sm font-normal text-gray-500">Capibas</span></span>
            </div>

            <div className="flex justify-between text-sm px-2">
              <span className="text-gray-400">Taxa de câmbio</span>
              <span className="font-medium text-gray-600">500 pts = 1 moeda</span>
            </div>
          </div>

          {/* Botão */}
          <button 
            onClick={handleConverter}
            disabled={moedasPossiveis <= 0}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-[0.98] ${
              moedasPossiveis > 0 
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-orange-200' 
                : 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none'
            }`}
          >
            {moedasPossiveis > 0 ? 'Converter Pontos' : 'Saldo Insuficiente'}
          </button>

        </div>

        {/* Teste (remover depois) */}
        <button 
          onClick={() => setPontos(pontos + 500)} 
          className="mt-10 text-xs text-gray-300 hover:text-gray-500 transition"
        >
          (Simular ganho de 500 pts)
        </button>

      </main>
    </div>
  );
}
