import React from 'react';
import './PaginaInicial.css';

// Componente para a Barra de Navegação Inferior (Footer Nav)
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

// Pontos Capiba
const PontosCapiba = () => (
  <section className="pontos-capiba-section">
    <div className="capiba-header">
      <span className="capiba-icon">🟠</span>
      <h2>Ganhe Pontos Capiba</h2>
      <p>Explore, compartilhe e acumule recompensas</p>
    </div>
    <div className="capiba-cards-container">
      {/* Regra 1: Cadastrar Local */}
      <div className="capiba-card">
        <span className="card-icon">📌</span>
        <p>+20 pts</p>
        <p>Cadastrar local</p>
      </div>
      {/* Regra 2: Visitar Local */}
      <div className="capiba-card">
        <span className="card-icon">📍</span>
        <p>+15 pts</p>
        <p>Visitar local</p> 
        
      </div>
    </div>
    <button className="ver-pontos-btn">Ver meus pontos</button>
  </section>
);

// Card de Local (Bombando)
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
      
      {/* Cabeçalho*/}
      <section className="visse-header-section">
        <h1>VIsse?</h1>
        <p>Porque a cultura pulsa em cada esquina!</p>
      </section>

      {/*Explorar Mapa*/}
      <div className="mapa-button-container">
        <button className="explorar-mapa-btn">
            <span className="icon">🗺️</span> Explorar Mapa
        </button>
        <button className="add-float-btn">+</button>
      </div>

      {/* PONTOS CAPIBA */}
      <PontosCapiba />
      
      {/* BOMBANDO */}
      <section className="bombando-section">
        <h2>🔥 Bombando</h2>
        <p className="bombando-subtitle">Os locais culturais mais curtidos e recomendados de Recife</p>

        {/* LOCAIS */}
        <LocalCard 
            title="Sovaj Veg Bar"
            description="Bar vegano inovador em Recife, com drinks criativos autorais e petiscos 100% vegetais. Ambiente desc..."
            likes={234}
            imageSrc="https://imagens.ne10.uol.com.br/veiculos/_midias/jpg/2024/10/02/img_4476-32921678.jpeg" 
            colorIcon="blue-tag"
        />

        <LocalCard 
            title="Rua da Feira"
            description="Rua cultural com galerias de arte, bares e movimento artístico alternativo. Um dos centros da cultur..."
            likes={198}
            imageSrc="https://ton.x.com/i/ton/data/dm/1988061385616748852/1988061377458475008/f2eU1eTD.png:medium"
            colorIcon="green-tag"
        />

        <LocalCard 
            title="Feira Na Laje"
            description="Feira cultural alternativa com música, arte e gastronomia local. Um evento imperdível que acontece..."
            likes={189}
            imageSrc="https://cdn.folhape.com.br/img/pc/1100/1/dn_arquivo/2025/04/whatsapp-image-2025-04-04-at-184205.jpg"
            colorIcon="blue-tag"
        />
        
      </section>

      {/* NAVEGAÇÃO INFERIOR */}
      <FooterNav />
      
    </div>
  );
}

export default PaginaInicial;