import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService'; // Para importar o serviço
import './LoginScreen.css';

export default function Login() {
  const navigate = useNavigate();
  // Estado para capturar o que o usuário digita
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault(); // Evita recarregar a página
    setLoading(true);
    setErro(null);

    try {
      // Chamada para o backend
      await authService.login(cpf, senha); 
      // Se der certo, vai para o app
      navigate('/app', { replace: true });
    } catch (error) {
      setErro(error.message || "Erro ao entrar. Verifique seus dados.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <header className="login-header">
        <h1 className="login-logo">Visse<span>?</span></h1>
        {/* ... resto do header ... */}
      </header>

      {/* Adicionar campos de input reais no lugar do texto estático */}
      <form className="login-form" onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="CPF (apenas números)" 
          value={cpf}
          onChange={e => setCpf(e.target.value)}
          className="input-login"
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className="input-login"
        />
        
        {erro && <p className="error-message">{erro}</p>}

        <footer className="login-footer login-footer-extra">
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar com Conecta Recife'}
          </button>
        </footer>
      </form>
    </div>
  );
}