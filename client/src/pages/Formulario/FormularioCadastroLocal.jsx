import React, { useState } from 'react';
import '../../Formularios.css';

const FormularioCadastroLocal = ({ aoEnviar, aoVoltar }) => {
  const [nomeLocal, setNomeLocal] = useState('');
  const [tipoLocal, setTipoLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [arquivoImagem, setArquivoImagem] = useState(null);
  
  const lidarComImagem = (evento) => { setArquivoImagem(evento.target.files[0]); };
  
  const lidarComEnvio = (evento) => {
    evento.preventDefault();
    const dadosLocal = { nome: nomeLocal, tipo: tipoLocal, descricao: descricao, imagem: arquivoImagem, tipo: 'local' };
    
    aoEnviar(dadosLocal);
    // Limpar o formulario
    setNomeLocal(''); setTipoLocal(''); setDescricao(''); setArquivoImagem(null);
  };

  return (
    <>
      <header className="header-form">
        <a href="#" className="voltar" onClick={(e) => { e.preventDefault(); aoVoltar(); }}>←</a>
        <h2>Cadastrar Local</h2>
      </header>

      <p className="subtitulo">Compartilhe um local que representa a cultura de Recife</p>

      <form className="form" onSubmit={lidarComEnvio}>

        <label className="upload-area">
          <span>{arquivoImagem ? arquivoImagem.name : '📷 Toque para adicionar foto'}</span>
          <input type="file" accept="image/*" onChange={lidarComImagem} required/>
        </label>

        <input type="text" placeholder="Nome do local" value={nomeLocal} onChange={(e) => setNomeLocal(e.target.value)} required />

        <select value={tipoLocal} onChange={(e) => setTipoLocal(e.target.value)} required>
          <option value="">Tipo do local</option>
          <option>Bar</option>
          <option>Praça</option>
          <option>Cultural</option>
          <option>Gastronômico</option>
          <option>Histórico</option>
        </select>

        <textarea placeholder="Por que este local representa Recife?" value={descricao} onChange={(e) => setDescricao(e.target.value)} required></textarea>

        <button className="btn-salvar" type="submit">
          Salvar
        </button>
      </form>
    </>
  );
};

export default FormularioCadastroLocal;