import React, { useState } from 'react';
import './ConversaoCapiba.css';

export default function ConversaoCapibaScreen({ initialPoints = 0, onConvert }) {
  const [pontos, setPontos] = useState(Number(initialPoints) || 0);
  const taxa = 500;

  const moedasRecebidas = Math.floor(pontos / taxa);
  const pontosRestantes = pontos - moedasRecebidas * taxa;

  function handleAddPoints(amount) {
    setPontos(prev => Math.max(0, prev + Number(amount)));
  }

  function handleConvert() {
    if (moedasRecebidas <= 0) return;
    if (typeof onConvert === 'function') {
      onConvert({ moedas: moedasRecebidas, pontosTrocados: moedasRecebidas * taxa });
    }
    setPontos(pontosRestantes);
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-white page-capiba">
      <div className="w-full max-w-[500px] p-4">
        {/* Header */}
        <header className="rounded-2xl p-4 mb-4 shadow-sm header-capiba">
          <h1 className="text-white text-xl font-bold">Converter Pontos</h1>
          <p className="text-white/90 text-sm mt-1">Moeda Capiba — 500 pontos = 1 moeda</p>
        </header>

        {/* Card saldo */}
        <section className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Seu saldo de pontos</p>
              <p className="text-2xl font-extrabold mt-1">{pontos.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Moedas possíveis</p>
              <p className="text-2xl font-extrabold mt-1 moedas-valor">{moedasRecebidas}</p>
            </div>
          </div>

          <div className="mt-4 border-t pt-4">
            <p className="text-sm text-gray-600">Taxa de conversão</p>
            <p className="font-medium">{taxa} pontos = 1 Moeda Capiba</p>
          </div>
        </section>

        {/* Simulação / Controles */}
        <section className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <label className="block text-sm text-gray-700 mb-2">Adicionar pontos (teste)</label>
          <div className="flex gap-2">
            <button onClick={() => handleAddPoints(100)} className="flex-1 py-2 rounded-lg font-medium border">+100</button>
            <button onClick={() => handleAddPoints(500)} className="flex-1 py-2 rounded-lg font-medium border">+500</button>
            <button onClick={() => handleAddPoints(1000)} className="flex-1 py-2 rounded-lg font-medium border">+1000</button>
          </div>

          <div className="mt-4 text-sm text-gray-700">
            <p>Você receberá <strong>{moedasRecebidas} Moeda{moedasRecebidas !== 1 ? 's' : ''} Capiba</strong> ao converter agora.</p>
            <p className="mt-1 text-gray-500">Pontos que serão trocados: <strong>{moedasRecebidas * taxa}</strong></p>
            <p className="text-gray-500">Pontos restantes após conversão: <strong>{pontosRestantes}</strong></p>
          </div>

          <button
            onClick={handleConvert}
            disabled={moedasRecebidas <= 0}
            className="btn-converter disabled:opacity-50 mt-4"
          >
            Converter agora
          </button>
        </section>

        <footer className="text-xs text-gray-500 text-center mt-2">
          <p>Observação: a conversão arredonda sempre para baixo — apenas moedas inteiras são distribuídas.</p>
        </footer>
      </div>
    </div>
  );
}
