import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiCalendar } from 'react-icons/fi';
import api from '../../services/api';

export default function VisitedScreen() {
  const navigate = useNavigate();
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/pontuacao/minha').then(res => {
      setVisitas(res.data.historico_recente.filter(h => h.acao === 'VISITAR_LOCAL'));
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-4 flex items-center border-b">
        <button onClick={() => navigate(-1)} className="p-2"><FiArrowLeft size={24}/></button>
        <h1 className="ml-2 font-bold text-lg">Minhas Visitas</h1>
      </header>
      <div className="p-4 space-y-4">
        {visitas.map((v, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-green-500" size={20}/>
              <div>
                <p className="font-bold text-gray-800">{v.descricao.split('"')[1] || "Local Visitado"}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1"><FiCalendar/> {new Date(v.data).toLocaleDateString()}</p>
              </div>
            </div>
            <span className="text-orange-500 font-bold text-sm">+20 pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}