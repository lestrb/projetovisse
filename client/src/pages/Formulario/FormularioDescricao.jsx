/*import React, { useState } from 'react';
import '../../Formularios.css';

const FormularioDescricao = ({ aoEnviar, aoVoltar }) => {
  const [textoDescricao, setTextoDescricao] = useState('');
  
  const lidarComEnvio = (evento) => {
    evento.preventDefault();
    if (!textoDescricao.trim()) return;
    
    aoEnviar({ descricao: textoDescricao, tipo: 'descricao' }); 
    setTextoDescricao('');
  };

  return (
    <>
      <header className="header-form">
        <a href="#" className="voltar" onClick={(e) => { e.preventDefault(); aoVoltar(); }}>←</a>
        <h2>Adicionar Perspectiva</h2>
      </header>

      <p className="subtitulo">Compartilhe sua visão pessoal sobre este local!</p>

      <form className="form" onSubmit={lidarComEnvio}>
        
        <textarea 
          placeholder="Minha perspectiva sobre este lugar..." 
          required
          value={textoDescricao}
          onChange={(e) => setTextoDescricao(e.target.value)}
        ></textarea>
        
        <button className="btn-salvar" type="submit">
          Enviar Descrição
        </button>
      </form>
    </>
  );
};

export default FormularioDescricao;*/ 