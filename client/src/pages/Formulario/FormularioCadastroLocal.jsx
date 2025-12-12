import React, { useState } from 'react';
import { FiCamera, FiLoader } from 'react-icons/fi';
import { localService } from '../../services/localService'; // Importando o serviço correto
import { useNavigate } from 'react-router-dom'; // Para navegar após sucesso
import '../../styles/Formularios.css'; 

const FormularioCadastroLocal = ({ aoVoltar }) => {
  const navigate = useNavigate();
  
  // Estados do formulário
  const [nomeLocal, setNomeLocal] = useState('');
  const [tipoLocal, setTipoLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [enderecoManual, setEnderecoManual] = useState(''); // Guarda o texto do endereço
  
  // Estados da imagem e loading
  const [arquivoImagem, setArquivoImagem] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const lidarComImagem = (evento) => {
    const file = evento.target.files[0];
    if (file) {
      setArquivoImagem(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const lidarComEnvio = async (evento) => {
    evento.preventDefault();
    setLoading(true);

    try {
        const formData = new FormData();
        formData.append('nome', nomeLocal);
        formData.append('tipo', tipoLocal);
        formData.append('descricao', descricao);
        // AQUI: Enviamos o texto digitado pelo usuário
        formData.append('endereco', enderecoManual); 
        
        if (arquivoImagem) {
            formData.append('imagem', arquivoImagem);
        }

        // Chama o backend (que vai calcular a latitude/longitude sozinho)
        await localService.criarLocalComUpload(formData);
        
        alert('Local cadastrado com sucesso!');
        navigate('/app/mapa');
        
    } catch (error) {
        console.error(error);
        // Mostra erro se o endereço não for achado
        alert(error.message || 'Erro ao cadastrar local. Verifique o endereço.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-inter">
      <header className="header-form flex items-center p-4 bg-[#00bcd4] text-white fixed top-0 w-full z-20 shadow-md">
        <button 
          className="voltar mr-4 text-2xl font-light hover:opacity-80" 
          onClick={(e) => { e.preventDefault(); navigate(-1); }}
        >
          ←
        </button>
        <h2 className="text-lg font-bold tracking-wide">Cadastrar Local</h2>
      </header>

      <form className="form pt-24 px-4 max-w-md mx-auto flex flex-col gap-5" onSubmit={lidarComEnvio}>
        
        {/* Input de foto */}
        <label className={`h-52 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition relative overflow-hidden bg-gray-50 ${arquivoImagem ? 'border-[#00bcd4]' : 'border-gray-300 hover:bg-gray-100'}`}>
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <FiCamera size={40} className="mb-2 text-[#00bcd4]" />
              <span className="text-sm font-medium">Adicionar foto</span>
            </div>
          )}
          <input type="file" accept="image/*" onChange={lidarComImagem} required className="hidden"/>
        </label>

        {/* Nome */}
        <input 
          type="text" placeholder="Nome do local" value={nomeLocal} onChange={(e) => setNomeLocal(e.target.value)} required 
          className="p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#00bcd4]"
        />

        {/* Categoria */}
        <select value={tipoLocal} onChange={(e) => setTipoLocal(e.target.value)} required className="p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#00bcd4] bg-white text-gray-700">
          <option value="" disabled>Selecione a categoria...</option>
          <option value="Bares">Bar ou restaurante</option>
          <option value="Ar Livre">Praça ou ar-livre</option>
          <option value="Cultura">Cultural / Museu</option>
          <option value="Historico">Histórico</option>
        </select>

        {/* Input de endereço */}
        <div>
            <input 
            type="text" 
            placeholder="Endereço (Rua, Número, Bairro)" 
            value={enderecoManual} 
            onChange={(e) => setEnderecoManual(e.target.value)} 
            required 
            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#00bcd4]"
            />
            <p className="text-xs text-gray-400 mt-1 ml-1">Digite o endereço completo para acharmos no mapa.</p>
        </div>

        {/* Descrição */}
        <textarea 
          placeholder="Descrição do local..." value={descricao} onChange={(e) => setDescricao(e.target.value)} required rows="4"
          className="p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#00bcd4] resize-none"
        ></textarea>

        {/* Botão salvar */}
        <button 
          className="mt-4 bg-[#ff7a00] text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-110 transition disabled:opacity-50" 
          type="submit"
          disabled={loading}
        >
          {loading ? ( <span className="flex items-center justify-center gap-2"><FiLoader className="animate-spin"/> Salvando...</span> ) : 'Cadastrar Local'}
        </button>
      </form>
    </div>
  );
};

export default FormularioCadastroLocal;
