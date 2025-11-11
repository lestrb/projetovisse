import React from 'react';
import './PaginaInicial.css';

const FooterNav = () => (
  <nav className="footer-nav">
    <a href="#" className="nav-item active">
      <span className="icon">🏠</span>
      Início
    </a>
    <a href="#" className="nav-item">
      <span className="icon">🗺️</span>
      Mapa
    </a>
    <button className="nav-add-button">+</button>
    <a href="#" className="nav-item">
      <span className="icon">🔍</span>
      Buscar
    </a>
    <a href="#" className="nav-item">
      <span className="icon">👤</span>
      Perfil
    </a>
  </nav>
);

const PontosCapiba = () => (
  <section className="pontos-capiba-section">
    <div className="capiba-header">
      <span className="capiba-icon">🟠</span>
      <h2>Ganhe Pontos Capiba</h2>
      <p>Explore, compartilhe e acumule recompensas</p>
    </div>
    <div className="capiba-cards-container">
      {/* 1. Cadastrar Local */}
      <div className="capiba-card">
        <span className="card-icon">📌</span>
        <p>+20 pts</p>
        <p>Cadastrar local</p>
      </div>
      {/* 2. Curta (Vazio conforme a regra) */}
      <div className="capiba-card empty-card">
        <span className="card-icon">🧡</span>
        <p>+5 pts</p>
        <p>Curtir</p>
      </div>
      {/* 3. Comentar (Vazio conforme a regra) */}
      <div className="capiba-card empty-card">
        <span className="card-icon">💬</span>
        <p>+10 pts</p>
        <p>Comentar</p>
      </div>
      {/* 4. Visitar local (Check-in) */}
      <div className="capiba-card">
        <span className="card-icon">🧿</span>
        <p>+15 pts</p>
        <p>Check-in</p>
      </div>
    </div>
    <button className="ver-pontos-btn">Ver meus pontos</button>
  </section>
);

const LocalCard = ({ title, description, likes, imageSrc, colorIcon }) => (
    <div className="local-card">
        <div className="card-image-container">
            <span className={`card-icon-tag ${colorIcon}`}></span>
            <span className="card-bookmark">🔖</span> 
            <img src={imageSrc} alt={title} className="card-image"/>
        </div>
        <div className="card-content">
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="card-footer">
                <span className="likes">❤️ {likes}</span>
                <button className="interact-btn">🔵</button>
            </div>
        </div>
    </div>
);


function PaginaInicial() {
  return (
    <div className="pagina-inicial">
      
      <div className="content-wrapper"> 
        
        <section className="visse-header-section">
          <h1>VIsse?</h1>
          <p>Porque a cultura pulsa em cada esquina!</p>
        </section>

        <div className="mapa-button-container">
          <button className="explorar-mapa-btn">
              <span className="icon">🗺️</span> Explorar Mapa
          </button>
          <button className="add-float-btn">+</button>
        </div>

        {/* ORDEM DO PROTÓTIPO: BOMBANDO VEM ANTES DE PONTOS CAPIBA */}
        <section className="bombando-section">
          <h2>🔥 Bombando</h2>
          <p className="bombando-subtitle">Os locais culturais mais curtidos e recomendados de Recife</p>

          <div className="locais-list-container">
            <LocalCard 
                title="Sovaj Veg Bar"
                description="Bar vegano inovador em Recife, com drinks criativos autorais e petiscos 100% vegetais. Ambiente desc..."
                likes={234}
                imageSrc="/caminho/para/imagem1.jpg" 
                colorIcon="blue-tag"
            />

            <LocalCard 
                title="Rua da Feira"
                description="Rua cultural com galerias de arte, bares e movimento artístico alternativo. Um dos centros da cultur..."
                likes={198}
                imageSrc="/caminho/para/imagem2.jpg"
                colorIcon="green-tag"
            />

            <LocalCard 
                title="Feira Na Laje"
                description="Feira cultural alternativa com música, arte e gastronomia local. Um evento imperdível que acontece..."
                likes={189}
                imageSrc="/caminho/para/imagem3.jpg"
                colorIcon="blue-tag"
            />
          </div>
        </section>

        {/* SEÇÃO PONTOS CAPIBA */}
        <PontosCapiba />

      </div>
      
      <FooterNav />
      
    </div>
  );
}

export default PaginaInicial;