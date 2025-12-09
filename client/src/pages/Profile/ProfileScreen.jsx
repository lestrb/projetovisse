import React, { useState, useEffect } from 'react';
import { FiEdit2, FiLogOut, FiSettings, FiMapPin, FiBookmark, FiLoader, FiAlertTriangle, FiDollarSign } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // dados temporários antes de termos a API funcionando, para pegar as informacoes do bd
    const userDataInitial = {
      nome: 'Membro Visse?',
      email: 'exemplo@visse.com.br',
      bio: 'Explorador da cultura recifense.',
      pontos: 0,             // Saldo atual de pontos, zerado inicialmente
      lugaresVisitados: 0,   // Número de check-ins realizados
      fotoUrl: 'https://via.placeholder.com/150/00bcd4/ffffff?text=U'
    };

    // Para buscar os dados do usuário na API
    useEffect(() => {
        const fetchUserData = async () => {
          setLoading(true);
          setError(null);
          try {
            // Recupera o token armazenado (exemplo: localStorage)
            const token = localStorage.getItem('userToken'); 
            // Simula o delay de uma chamada real à API
            await new Promise(resolve => setTimeout(resolve, 600));


            // Simulando dados do back-end
            const mockResponseUserData = {
              nome: 'Clara Laranjeira',
              email: 'clara@recife.com',
              bio: 'Amante de carnaval e de bolo de rolo.',
              pontos: 120,
              lugaresVisitados: 17,
              fotoUrl: 'https://i.pravatar.cc/150?img=5' 
            };
            // Deixa os dados mockados aparentes enquanto a API não está pronta
            setUserData(mockResponseUserData);

          } catch (e) {
            setError('Erro na conexão. Tente novamente mais tarde.');
          } finally {
            setLoading(false);
          }
        };
        fetchUserData();
      }, []);
    
      // Decide quais dados exibir: os da API ou os iniciais, dependendo do estado
      const displayData = userData || userDataInitial;
    
      // Funções usadas para a navegação e as ações dos botões
      const handleNavigateToFavorites = () => navigate('/app/favoritos');
      const handleEdit = () => navigate('/app/perfil/editar');
      const handleSettings = () => navigate('/app/configuracoes');
      // Função de logout, removendo o token e redirecionando para a tela de login
      const handleLogout = () => { 
        localStorage.removeItem('userToken');
        navigate('/', { replace: true }); 
      };
    
      // Componente para exibir cada uma das metricas (saldo e visitas)
      const StatCard = ({ icon: Icon, value, label, highlight }) => (
        <div className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-sm border ${highlight ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-100'}`}>
          <div className={`p-2 rounded-full mb-2 ${highlight ? 'bg-orange-100 text-orange-600' : 'bg-blue-50 text-blue-500'}`}>
            <Icon size={24} />
          </div>
          <span className={`text-2xl font-extrabold ${highlight ? 'text-orange-600' : 'text-gray-800'}`}>
            {value}
          </span>
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</span>
        </div>
      );

      // Para renderizar a tela de perfil, com feedback de loading e erro
      return (
        <div className="max-w-md mx-auto mt-4 px-4 pb-24"> 
          
          {/* Feedback */}
          {loading && (
            <div className="text-center p-4 text-blue-500 bg-blue-50 rounded-lg mb-4 flex items-center justify-center gap-2">
              <FiLoader className="animate-spin" size={20} /> Carregando...
            </div>
          )}
          {error && (
            <div className="text-center p-4 text-red-600 bg-red-100 rounded-lg mb-4 flex items-center justify-center gap-2">
              <FiAlertTriangle size={20} /> {error}
            </div>
          )}
    
          {/* Seção que contém a foto de perfil e dados básicos */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="flex flex-col items-center relative z-10 -mt-2">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-3 border-4 border-white shadow-lg bg-gray-200">
                <img 
                  src={displayData.fotoUrl} 
                  alt="Foto de Perfil" 
                  className="w-full h-full object-cover"
                />
              </div>
            
              <h1 className="text-2xl font-bold text-gray-900">{displayData.nome}</h1>
              <p className="text-sm text-gray-500 mb-2">{displayData.email}</p>
              <p className="text-sm text-gray-600 text-center px-4 italic">
                "{displayData.bio}"
              </p>
            </div>
          </section>

          {/* Seção que contém as métricas, pontos e quantidade de locais visitados */}
          <section className="grid grid-cols-2 gap-4 mb-6">
            <StatCard 
              icon={FiDollarSign} 
              value={displayData.pontos} 
              label="Pontos" 
              highlight={true} 
            />
            <StatCard 
              icon={FiMapPin} 
              value={displayData.lugaresVisitados} 
              label="Visitas" 
              highlight={false} 
            />
          </section>
    
          {/* Seção de ações e/ou botões */}
          <section className="flex flex-col gap-3">
            <button 
              onClick={handleNavigateToFavorites} 
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
              onClick={handleEdit} 
              className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-500 rounded-lg group-hover:bg-blue-200 transition">
                    <FiEdit2 size={20} />
                </div>
                <span className="font-semibold text-gray-700">Editar perfil</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button 
              onClick={handleSettings} 
              className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 text-gray-500 rounded-lg group-hover:bg-gray-200 transition">
                    <FiSettings size={20} />
                </div>
                <span className="font-semibold text-gray-700">Configurações</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
    
            <button 
              onClick={handleLogout} 
              className="w-full flex items-center justify-center gap-2 p-4 mt-2 text-red-500 font-semibold hover:bg-red-50 rounded-xl transition"
            >
              <FiLogOut size={20} />
              <span>Sair</span>
            </button>
          </section>
          
        </div>
      );
    };
    
    export default ProfileScreen;
