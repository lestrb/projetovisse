import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginScreen.css';

export default function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    // aqui você faria a autenticação real e, se ok, navega para a Home
    navigate('/app', { replace: true });
  }

  return (
    <div className="login-container">
      <header className="login-header">
        <h1 className="login-logo">Visse<span>?</span></h1>
        <p className="login-slogan">Porque a cultura pulsa em cada esquina!</p>
        <div className="login-icons" aria-hidden="true">
          <span>🏛️</span>
          <span>🏦</span>
          <span>🌴</span>
          <span>🏆</span>
        </div>
      </header>

      <main className="login-features">
        <h2>Descubra a cultura de Recife</h2>
        <ul className="features-list">
          <li>Explore locais culturais únicos</li>
          <li>Compartilhe suas descobertas</li>
          <li>Ganhe pontos e moedas Capiba</li>
        </ul>
      </main>

      <footer className="login-footer">
        <button type="button" className="login-button" onClick={handleLogin}>
          Entrar com Conecta Recife
        </button>
        <p className="footer-text">Desenvolvido com ❤️ para Recife</p>
        <p className="footer-text-secondary">Conecte-se ao ecossistema cultural de Recife</p>
      </footer>
    </div>
  );
}