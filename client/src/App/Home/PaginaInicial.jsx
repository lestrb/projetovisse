import React from 'react';

import './PaginaInicial.css';



function PaginaInicial() {

  return (

    <div className="pagina-inicial">

      {/* HEADER */}

      <header className="header">

        <div className="logo-container">

          <h1 className="logo">Visse?</h1>

        </div>

        <nav className="menu">

          <a href="#descubra">Descubra</a>

          <a href="#sobre">Sobre</a>

          <a href="#login" className="login-btn">Entrar</a>

        </nav>

      </header>



      {/* HERO SECTION */}

      <section className="hero">

        <div className="texto-hero">

          <h2>Explore Recife de um jeito novo</h2>

          <p>Descubra locais únicos, compartilhe experiências e ganhe pontos Capiba!</p>

          <button className="botao-hero">Ganhe Pontos Capiba</button>

        </div>

      </section>



      {/* CARROSSEL DE IMAGENS */}

      <section className="carrossel">

        <h3>Lugares em destaque</h3>

        <div className="imagens-container">

          <div className="card">

            <img

              src="https://imagens.ne10.uol.com.br/veiculos/_midias/jpg/2024/10/02/img_4476-32921678.jpeg"

              alt="Sovaj Veg Bar"

            />

            <p>Sovaj Veg Bar</p>

          </div>

          <div className="card">

            <img

              src="https://ton.x.com/i/ton/data/dm/1988061385616748852/1988061377458475008/f2eU1eTD.png:medium"

              alt="Rua da Feira"

            />

            <p>Rua da Feira</p>

          </div>

          <div className="card">

            <img

              src="https://cdn.folhape.com.br/img/pc/1100/1/dn_arquivo/2025/04/whatsapp-image-2025-04-04-at-184205.jpg"

              alt="Feira na Laje"

            />

            <p>Feira na Laje</p>

          </div>

        </div>

      </section>



      {/* FOOTER */}

      <footer className="footer">

        <p>© 2025 Visse? Todos os direitos reservados.</p>

      </footer>

    </div>

  );

}



export default PaginaInicial;