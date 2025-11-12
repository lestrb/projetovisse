import React, { useState } from 'react';
// [NOVA IMPORTAÇÃO] Importamos o hook 'useParams' para ler o ID da URL
import { useParams } from 'react-router-dom';

// [CORREÇÃO DE CSS] Corrigimos o caminho do CSS
import '../../Formularios.css';

const FormularioDescricao = ({ aoEnviar, aoVoltar }) => {
  // [NOVO] Usamos o hook para pegar os parâmetros da URL.
  // O nome "id" deve ser o mesmo que definimos na rota no App.jsx (path="local/:id")
  const { id } = useParams();

  const [textoDescricao, setTextoDescricao] = useState('');
  
  const lidarComEnvio = (evento) => {
    evento.preventDefault();
    if (!textoDescricao.trim()) return;
    
    // Agora você também tem o 'id' do local para enviar junto
    console.log(`Enviando descrição para o local ID: ${id}`);
    aoEnviar({ descricao: textoDescricao, tipo: 'descricao', localId: id }); 
    setTextoDescricao('');
  };

  // Esta função de 'aoVoltar' não vai funcionar como esperado
  // pois o componente é renderizado por uma rota, não por outro componente.
  // Vamos deixar assim por enquanto, mas o ideal é usar navigate(-1) do react-router-dom.
  const handleVoltarClick = (e) => {
    e.preventDefault();
    if (aoVoltar) {
      aoVoltar();
    } else {
      // Um fallback, embora o ideal seja injetar o `useNavigate` aqui.
      window.history.back(); 
    }
  };

  return (
    <>
      <header className="header-form">
        <a href="#" className="voltar" onClick={handleVoltarClick}>←</a>
        <h2>Adicionar Perspectiva</h2>
      </header>

      {/* [MUDANÇA] Mostramos o ID para provar que funcionou */}
      <p className="subtitulo">
        Compartilhe sua visão pessoal sobre este local (ID: {id})
      </p>

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

export default FormularioDescricao;