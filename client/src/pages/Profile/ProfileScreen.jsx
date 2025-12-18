import React, { useState, useEffect } from 'react';
import { 
  FiEdit2, FiLogOut, FiSettings, FiMapPin, 
  FiBookmark, FiLoader, FiAlertTriangle, FiDollarSign, FiCheckCircle 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; //

const ProfileScreen = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
          setLoading(true);
          setError(null);
          try {
            // Pega os dados do usuário 
            const storedUser = JSON.parse(localStorage.getItem('user'));
            
            // Busca a pontuação e histórico 
            const pontuacaoRes = await api.get('/pontuacao/minha');
            
            // Filtra a quantidade de visitas validadas do histórico
            const visitasUnicas = pontuacaoRes.data.historico_recente.filter(
                h => h.acao === 'VISITAR_LOCAL'
            ).length;

            setUserData({
              ...storedUser,
              pontos: pontuacaoRes.data.pontos_visse,
              lugaresVisitados: visitasUnicas,
              fotoUrl: `https://ui-avatars.com/api/?name=${storedUser.nome}&background=00bcd4&color=fff`
            });

          } catch (e) {
            setError('Não foi possível carregar os dados atualizados.');
            console.error(e);
          } finally {
            setLoading(false);
          }
        };
        fetchUserData();
      }, []);
    
      const handleLogout = () => { 
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/', { replace: true }); 
      };
    
      const StatCard = ({ icon: Icon, value, label, highlight, onClick }) => (
        <div 
          onClick={onClick}
          className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-sm border transition-transform active:scale-95 cursor-pointer
          ${highlight ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-100'}`}
        >
          <div className={`p-2 rounded-full mb-2 ${highlight ? 'bg-orange-100 text-orange-600' : 'bg-blue-50 text-blue-50'}`}>
            <Icon size={24} />
          </div>
          <span className={`text-2xl font-extrabold ${highlight ? 'text-orange-600' : 'text-gray-800'}`}>
            {value}
          </span>
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</span>
        </div>
      );

      return (
        <div className="max-w-md mx-auto mt-4 px-4 pb-24 font-inter"> 
          
          {loading && (
            <div className="text-center p-4 text-blue-500 flex items-center justify-center gap-2">
              <FiLoader className="animate-spin" size={20} /> Atualizando saldo...
            </div>
          )}

          {/* Cabeçalho */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border-4 border-white shadow-lg bg-gray-200">
                <img src={userData?.fotoUrl} alt="Foto" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">{userData?.nome || 'Carregando...'}</h1>
              <p className="text-sm text-gray-500">{userData?.email}</p>
            </div>
          </section>

          {/* Cards de status */}
          <section className="grid grid-cols-2 gap-4 mb-6">
            <StatCard 
              icon={FiDollarSign} 
              value={userData?.pontos || 0} 
              label="Pontos" 
              highlight={true}
              onClick={() => navigate('/app/conversao')}
            />
            <StatCard 
              icon={FiMapPin} 
              value={userData?.lugaresVisitados || 0} 
              label="Visitas" 
              highlight={false} 
              onClick={() => navigate('/app/perfil/visitas')}
            />
          </section>
    
          {/* Menu */}
          <section className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/app/perfil/visitas')} 
              className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg group-hover:bg-green-200 transition">
                    <FiCheckCircle size={20} />
                </div>
                <span className="font-semibold text-gray-700">Locais Visitados</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>

            <button 
              onClick={() => navigate('/app/favoritos')} 
              className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 text-pink-500 rounded-lg group-hover:bg-pink-200 transition">
                    <FiBookmark size={20} />
                </div>
                <span className="font-semibold text-gray-700">Favoritos</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button 
              onClick={handleLogout} 
              className="w-full flex items-center justify-center gap-2 p-4 mt-4 text-red-500 font-bold hover:bg-red-50 rounded-xl transition"
            >
              <FiLogOut size={20} />
              <span>Sair da conta</span>
            </button>
          </section>
          
        </div>
      );
    };
    
    export default ProfileScreen;
