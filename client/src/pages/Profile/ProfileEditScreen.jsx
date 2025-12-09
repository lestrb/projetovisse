import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCamera, FiArrowLeft, FiSave } from 'react-icons/fi';

export default function ProfileEditScreen() {
  const navigate = useNavigate();
  
  // Iniciamente, com dados simulados (ainda sem a API)
  const [formData, setFormData] = useState({
    nome: 'Clara Laranjeira',
    bio: 'Amante de carnaval e de bolo de rolo.',
    foto: 'https://i.pravatar.cc/150?img=5'
  });

  // Atualiza o estado do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // E aqui "salva" os dados (ainda sem a API)
  const handleSave = (e) => {
    e.preventDefault();
    console.log("Dados atualizados:", formData);
    // Aqui eu faria a chamada para a API para salvar os dados
    
    // Redireciona de volta para a tela de perfil
    navigate('/app/perfil');
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-inter">
      {/* Botão de voltar */}
      <header className="flex items-center p-4 shadow-sm bg-white sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
        >
          <FiArrowLeft size={24} />
        </button>
        <h1 className="ml-4 text-xl font-bold text-gray-800">Editar perfil</h1>
      </header>

      <form onSubmit={handleSave} className="p-6 max-w-md mx-auto flex flex-col gap-6">
        
        {/* Foto de perfil */}
        <div className="flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <img 
              src={formData.foto} 
              alt="Foto de Perfil" 
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-md group-hover:brightness-90 transition"
            />
            <div className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition">
              <FiCamera size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-2">Alterar foto de perfil</p>
        </div>

        {/* Edit nome */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Editar nome</label>
          <input 
            type="text" 
            name="nome"
            value={formData.nome} 
            onChange={handleChange}
            className="p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-gray-800"
          />
        </div>

        {/* Edit bio */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Biografia</label>
          <textarea 
            name="bio"
            value={formData.bio} 
            onChange={handleChange}
            rows="3"
            maxLength="150"
            className="p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 resize-none text-gray-800"
          ></textarea>
          <span className="text-xs text-gray-400 text-right">{formData.bio.length}/150</span>
        </div>

        {/* Botão de salvar */}
        <button 
          type="submit" 
          className="mt-4 flex items-center justify-center gap-2 w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition transform active:scale-95"
        >
          <FiSave size={20} />
          Salvar
        </button>
      </form>
    </div>
  );
}