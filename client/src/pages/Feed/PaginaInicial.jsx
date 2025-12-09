import React from 'react';
import { Link } from 'react-router-dom';

function PaginaInicial() {
  const locais = [
    {
      id: '1',
      nome: 'Sovaj Veg Bar',
      rating: '4.8',
      imagem: 'https://imagens.ne10.uol.com.br/veiculos/_midias/jpg/2024/10/02/img_4476-32921678.jpeg'
    },
    {
      id: '2',
      nome: 'Rua da Feira',
      rating: '4.6',
      imagem: 'https://ton.x.com/i/ton/data/dm/1988061385616748852/1988061377458475008/f2eU1eTD.png:medium'
    },
    {
      id: '3',
      nome: 'Feira na Laje',
      rating: '4.9',
      imagem: 'https://cdn.folhape.com.br/img/pc/1100/1/dn_arquivo/2025/04/whatsapp-image-2025-04-04-at-184205.jpg'
    }
  ];

  return (
    <div className="pagina-inicial font-inter text-gray-900 min-h-screen flex flex-col">
      
      {/* HEADER AZUL */}
      <header className="header w-full bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white py-8 px-6 sm:px-16 flex flex-col items-center sm:items-start shadow-md">
        <div className="logo-container text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Visse?</h1>
          <p className="text-lg font-medium mt-2 opacity-90">
            Porque a cultura pulsa em cada esquina!
          </p>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero px-6 sm:px-16 py-12 sm:py-20 bg-white text-center">
        <div className="texto-hero max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Explore Recife de um jeito novo</h2>
          <p className="text-lg sm:text-xl text-gray-600 mt-4">
            Descubra locais únicos, compartilhe experiências e ganhe pontos Capiba!
          </p>
          {/* Este botão leva para o mapa também, caso queira manter */}
          <Link to="/app/mapa">
            <button className="botao-hero inline-block mt-8 px-8 py-3 rounded-xl bg-[#0077b6] text-white font-semibold text-lg hover:bg-[#005a8a] transition shadow-lg">
              Começar agora
            </button>
          </Link>
        </div>
      </section>

      {/* FAIXA VERDE - LINK MAPA */}
      <section className="explorar-mapa w-full bg-gradient-to-r from-[#38b000] to-[#70e000] py-4 text-center shadow-md">
        <Link to="/app/mapa" className="text-white text-lg font-semibold tracking-wide hover:opacity-90 transition flex justify-center items-center gap-2">
           🗺️ Ver todos os locais no mapa
        </Link>
      </section>

      {/* SEÇÃO BOMBANDO */}
      <section className="bombando flex flex-col items-center py-12 px-6 sm:px-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-[#0077b6] mb-10">
          Bombando 🔥
        </h2>

        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {locais.map((local) => (
              <Link 
                to={`/app/local/${local.id}`} 
                key={local.id} 
                className="card-bombando block bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition transform"
              >
                <article>
                  <img
                    src={local.imagem}
                    alt={local.nome}
                    className="h-60 w-full object-cover"
                  />
                  <div className="p-4 flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{local.nome}</h3>
                    <span className="text-yellow-500 text-xl">⭐ {local.rating}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- NOVA SEÇÃO LARANJA (Pontos Capiba) --- */}
      <section className="w-full bg-orange-500 py-16 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          
          {/* Título clicável -> Vai para o Perfil */}
          <Link to="/app/perfil">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 hover:underline decoration-white cursor-pointer inline-flex items-center gap-2">
              Ganhe Pontos Capiba 💰
            </h2>
          </Link>

          <p className="text-lg sm:text-xl mb-10 opacity-95">
            Agora é fácil: basta cadastrar um local ou visitar um ponto cultural para acumular seus pontos!
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            
            {/* Botão Cadastrar -> Vai para o Mapa */}
            <Link to="/app/mapa">
              <button className="bg-white text-orange-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-100 transition duration-300 flex items-center justify-center gap-3 w-full sm:w-auto">
                🏛️ Cadastrar Local
              </button>
            </Link>

            {/* Botão Visitar -> Vai para o Mapa */}
            <Link to="/app/mapa">
              <button className="bg-white text-orange-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-100 transition duration-300 flex items-center justify-center gap-3 w-full sm:w-auto">
                🚶 Visitar Local
              </button>
            </Link>

          </div>
        </div>
      </section>
      {/* ------------------------------------------- */}

      {/* RODAPÉ */}
      <footer className="footer bg-white shadow-inner py-6 mt-auto">
        <div className="flex justify-center gap-8 sm:gap-16 text-gray-700 text-lg font-medium">
          <Link to="/app" className="hover:text-[#0077b6] transition flex items-center gap-1">
            🏠 Início
          </Link>
          <Link to="/app/mapa" className="hover:text-[#0077b6] transition flex items-center gap-1">
            🗺️ Mapa
          </Link>
          <Link to="/app/perfil" className="hover:text-[#0077b6] transition flex items-center gap-1">
            👤 Perfil
          </Link>
        </div>
        <div className="text-center text-gray-400 text-sm mt-4">
          © 2025 Visse? Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

export default PaginaInicial;
