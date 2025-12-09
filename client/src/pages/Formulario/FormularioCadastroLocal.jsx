import React, { useState } from 'react';
import { FiCamera, FiMapPin, FiCheckCircle, FiLoader } from 'react-icons/fi';
import '../../styles/Formularios.css'; 

const FormularioCadastroLocal = ({ aoEnviar, aoVoltar }) => {
  // Estados do formulário
  const [nomeLocal, setNomeLocal] = useState('');
  const [tipoLocal, setTipoLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  
  // Estados da imagem
  const [arquivoImagem, setArquivoImagem] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Estados da localização para a integração com o backend
  const [localizacao, setLocalizacao] = useState(null); // {latitude, longitude}
  const [loadingLoc, setLoadingLoc] = useState(false); // Carregando localização

  // Função que cuida do envio da imagem e localização
  const lidarComImagem = (evento) => {
    const file = evento.target.files[0];
    if (file) {
      setArquivoImagem(file);
      // URL temporária para mostrar a foto na tela na hora
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Função para pegar a localização atual do usuário
  const pegarLocalizacao = () => {
    setLoadingLoc(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocalizacao({ latitude, longitude });
        setLoadingLoc(false);
      },
      (error) => {
        console.error("Erro GPS:", error);
        alert("Verifique se o GPS está ativo.");
        setLoadingLoc(false);
      }
    );
  };
  
  // Envia os dados do formulário para o componente pai
  const lidarComEnvio = (evento) => {
    evento.preventDefault();

    // Prepara os dados para envio
    const dadosParaEnvio = { 
      nome: nomeLocal, 
      tipo: tipoLocal, 
      descricao: descricao, 
      imagem: arquivoImagem,
      latitude: localizacao.latitude,
      longitude: localizacao.longitude,
      tipo_registro: 'local' 
    };
    
    if (aoEnviar) aoEnviar(dadosParaEnvio);
    
    // Quando o envio for concluído, mostra a mensagem
    alert('Local enviado com sucesso!');
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-inter">
      
      {/* Header */}
      <header className="header-form flex items-center p-4 bg-[#00bcd4] text-white fixed top-0 w-full z-20 shadow-md">
        <button 
          className="voltar mr-4 text-2xl font-light hover:opacity-80" 
          onClick={(e) => { e.preventDefault(); aoVoltar(); }}
        >
          ←
        </button>
        <h2 className="text-lg font-bold tracking-wide">Cadastrar Local</h2>
      </header>

      {/* Formulário */}
      <div className="form pt-24 px-4 max-w-md mx-auto flex flex-col gap-5">
        
        <p className="text-gray-500 text-sm text-center mb-2">
          Ajude a mapear a cultura de Recife. Adicione um local novo!
        </p>

        {/* Input de foto */}
        <label 
          className={`h-52 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition relative overflow-hidden bg-gray-50 ${
            arquivoImagem ? 'border-[#00bcd4]' : 'border-gray-300 hover:bg-gray-100'
          }`}
        >
          {previewUrl ? (
            // Se tem foto, mostra ela cobrindo tudo
            <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            // Se não tem, mostra ícone
            <div className="flex flex-col items-center text-gray-400">
              <FiCamera size={40} className="mb-2 text-[#00bcd4]" />
              <span className="text-sm font-medium">Adicionar foto</span>
            </div>
          )}
          
          <input type="file" accept="image/*" onChange={lidarComImagem} required className="hidden"/>
          
          {/* Edit foto */}
          {previewUrl && (
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-medium">
              Trocar foto
            </div>
          )}
        </label>

        {/* Nome do local */}
        <input 
          type="text" 
          placeholder="Nome do local (Ex: Praça do Arsenal)" 
          value={nomeLocal} 
          onChange={(e) => setNomeLocal(e.target.value)} 
          required 
          className="p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00bcd4] text-gray-800 placeholder-gray-400"
        />

        {/* Categoria */}
        <select 
          value={tipoLocal} 
          onChange={(e) => setTipoLocal(e.target.value)} 
          required
          className="p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00bcd4] text-gray-700 bg-white"
        >
          <option value="" disabled>Selecione a categoria...</option>
          <option value="Bares">Bar ou restaurante</option>
          <option value="Ar Livre">Praça ou ar-livre</option>
          <option value="Cultura">Cultural / Museu</option>
          <option value="Historico">Histórico</option>
          <option value="Gastronomia">Gastronomia</option>
          <option value="Feiras">Feira ou mercado</option>
        </select>

        {/* Botão de GPS */}
        <button 
          type="button"
          onClick={pegarLocalizacao}
          disabled={loadingLoc || localizacao}
          className={`flex items-center justify-center gap-2 p-4 rounded-xl border font-medium transition active:scale-95 ${
            localizacao 
              ? 'bg-green-50 border-green-200 text-green-700' 
              : 'bg-white border-blue-200 text-blue-600 hover:bg-blue-50'
          }`}
        >
          {loadingLoc ? (
            <FiLoader className="animate-spin" />
          ) : localizacao ? (
            <FiCheckCircle className="text-green-600" />
          ) : (
            <FiMapPin />
          )}
          
          {loadingLoc 
            ? "Buscando..." 
            : localizacao 
              ? "Localização confirmada!" 
              : "Pegar localização atual"}
        </button>

        {/* Descrição */}
        <textarea 
          placeholder="Por que este local é especial? Conte um pouco sobre a história ou o que tem de bom lá..." 
          value={descricao} 
          onChange={(e) => setDescricao(e.target.value)} 
          required
          rows="4"
          className="p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00bcd4] resize-none text-gray-800 placeholder-gray-400"
        ></textarea>

        {/* Botão de salvar (sónhablitado quando tudo é preenchido) */}
        <button 
          className="btn-salvar mt-4 bg-[#ff7a00] text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-110 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100" 
          type="submit"
          disabled={!localizacao || !arquivoImagem || !nomeLocal || !tipoLocal}
        >
          {localizacao ? 'Cadastrar Local' : 'Capture a localização primeiro'}
        </button>
      </div>
    </div>
  );
};

export default FormularioCadastroLocal;
