// alterei a pagina para agora termos um botao de check in nos locais
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiCheckCircle, FiLoader, FiAlertTriangle } from 'react-icons/fi';
import api from '../../services/api';

export default function DetalhesLocalScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [local, setLocal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkinLoading, setCheckinLoading] = useState(false);
  const [jaVisitou, setJaVisitou] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', msg: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [localRes, pontuacaoRes] = await Promise.all([
          api.get(`/locais/${id}`),
          api.get('/pontuacao/minha')
        ]);
        setLocal(localRes.data);
        const visitou = pontuacaoRes.data.historico_recente.some(
          h => h.acao === 'VISITAR_LOCAL' && h.local_id === id
        );
        setJaVisitou(visitou);
      } catch (err) {
        console.error("Erro ao carregar dados", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

const handleCheckIn = () => {
  if (!navigator.geolocation) return alert("GPS não suportado.");

  setCheckinLoading(true);
  navigator.geolocation.getCurrentPosition(async (pos) => {
    try {
      const res = await api.post('/locais/check-in', {
        local_id: id, 
        userLat: pos.coords.latitude,
        userLon: pos.coords.longitude
      });

      setFeedback({ type: 'success', msg: res.data.message }); // "Parabéns! +20 pontos"
      setJaVisitou(true);
    } catch (err) {
      setFeedback({ type: 'error', msg: err.response?.data?.message || "Erro ao validar" });
    } finally {
      setCheckinLoading(false);
    }
  });
};

  if (loading) return <div className="flex justify-center p-20"><FiLoader className="animate-spin" size={40}/></div>;

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="relative h-64 bg-gray-200">
        <img src={`http://localhost:3002${local?.imagem_url}`} className="w-full h-full object-cover" alt={local?.nome} />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md"><FiArrowLeft/></button>
      </div>

      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold">{local?.nome}</h1>
        <p className="text-gray-500 flex items-center gap-1 mt-1"><FiMapPin/> {local?.endereco}</p>

        <button 
          onClick={handleCheckIn}
          disabled={checkinLoading || jaVisitou}
          className={`w-full mt-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all
            ${jaVisitou ? 'bg-green-500 text-white' : 'bg-orange-500 text-white active:scale-95'}`}
        >
          {jaVisitou ? <><FiCheckCircle/> Visita confirmada!</> : checkinLoading ? <FiLoader className="animate-spin"/> : "📍 Validar visita (+20 pts)"}
        </button>

        {feedback.msg && (
          <div className={`mt-4 p-4 rounded-xl text-sm ${feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {feedback.msg}
          </div>
        )}

        <div className="mt-8">
          <h3 className="font-bold border-b pb-2">Sobre este local</h3>
          <p className="mt-2 text-gray-600 text-sm leading-relaxed">{local?.descricao}</p>
        </div>
      </div>
    </div>
  );
}
