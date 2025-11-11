import React from 'react';
import { Link } from 'react-router-dom';

function PaginaInicial() {
  return (
    <div className="pagina-inicial font-inter text-gray-900 min-h-screen flex flex-col">
      
      {/* HEADER - Corrigido e Mesclado */}
      <header className="header w-full bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white py-6 px-6 sm:px-16 flex flex-col sm:flex-row items-center justify-between shadow-md">
        <div className="logo-container">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Visse?</h1>
          <p className="text-lg font-medium mt-1 opacity-90 hidden sm:block">
            Porque a cultura pulsa em cada esquina!
          </p>
        </div>
        <nav className="menu mt-4 sm:mt-0 flex gap-4 sm:gap-6 text-lg items-center">
          <Link to="/app" className="hover:underline">Descubra</Link>
          <Link to="/sobre" className="hover:underline">Sobre</Link>
          <Link to="/" className="login-btn bg-white text-[#0077b6] font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition">
            Entrar
          </Link>
        </nav>
      </header>

      {/* HERO SECTION - Re-estruturado com Tailwind */}
      <section className="hero px-6 sm:px-16 py-12 sm:py-20 bg-white text-center">
        <div className="texto-hero max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Explore Recife de um jeito novo</h2>
          <p className="text-lg sm:text-xl text-gray-600 mt-4">
            Descubra locais únicos, compartilhe experiências e ganhe pontos Capiba!
          </p>
          <Link to="/app" className="botao-hero inline-block mt-8 px-8 py-3 rounded-xl bg-[#0077b6] text-white font-semibold text-lg hover:bg-[#005a8a] transition shadow-lg">
            Ganhe Pontos Capiba
          </Link>
        </div>
      </section>

      {/* EXPLORAR MAPA - Corrigido para <Link> */}
      <section className="explorar-mapa w-full bg-gradient-to-r from-[#38b000] to-[#70e000] py-4 text-center shadow-md">
        <Link to="/app/mapa" className="text-white text-lg font-semibold tracking-wide hover:opacity-90 transition">
          🗺️ Explorar mapa
        </Link>
      </section>

      {/* SEÇÃO BOMBANDO - Corrigida */}
      <section className="bombando flex flex-col items-center py-12 px-6 sm:px-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-[#0077b6] mb-10">
          Bombando 🔥
        </h2>

        <div className="w-full max-w-6xl">
          <h3 className="sr-only">Lugares em destaque</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {/* Card 1 */}
            <article className="card-bombando bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition transform">
              <img
                src="https://imagens.ne10.uol.com.br/veiculos/_midias/jpg/2024/10/02/img_4476-32921678.jpeg"
                alt="Sovaj Veg Bar"
                className="h-60 w-full object-cover"
              />
              <div className="p-4 flex items-center justify-between">
                <h3 className="font-semibold text-lg">Sovaj Veg Bar</h3>
                <span className="text-yellow-500 text-xl">⭐ 4.8</span>
              </div>
            </article>

            {/* Card 2 */}
            <article className="card-bombando bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition transform">
              <img
                src="https://ton.x.com/i/ton/data/dm/1988061385616748852/1988061377458475008/f2eU1eTD.png:medium"
                alt="Rua da Feira"
                className="h-60 w-full object-cover"
              />
              <div className="p-4 flex items-center justify-between">
                <h3 className="font-semibold text-lg">Rua da Feira</h3>
                <span className="text-yellow-500 text-xl">⭐ 4.6</span>
              </div>
            </article>

            {/* Card 3 */}
            <article className="card-bombando bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition transform">
              <img
                src="https://cdn.folhape.com.br/img/pc/1100/1/dn_arquivo/2025/04/whatsapp-image-2025-04-04-at-184205.jpg"
                alt="Feira na Laje"
                className="h-60 w-full object-cover"
              />
              <div className="p-4 flex items-center justify-between">
                <h3 className="font-semibold text-lg">Feira na Laje</h3>
                <span className="text-yellow-500 text-xl">⭐ 4.9</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SEÇÃO GANHE PONTOS CAPIBA */}
      <section className="ganhe-pontos bg-gradient-to-r from-[#f3722c] to-[#f8961e] py-14 px-6 sm:px-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-8">Ganhe Pontos Capiba 💰</h2>
        <p className="text-lg mb-10 opacity-95 max-w-3xl mx-auto">
          Agora é fácil: basta cadastrar um local ou visitar um ponto cultural
          para acumular seus pontos!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10">
          <button className="btn-capiba bg-white text-[#f3722c] font-semibold text-lg py-4 px-8 rounded-xl shadow-md hover:scale-105 transition">
            🏛️ Cadastrar Local
          </button>
          <button className="btn-capiba bg-white text-[#f3722c] font-semibold text-lg py-4 px-8 rounded-xl shadow-md hover:scale-105 transition">
            🚶‍♀️ Visitar Local
          </button>
        </div>
      </section>

      {/* RODAPÉ - Corrigido */}
      <footer className="footer bg-white shadow-inner py-6 mt-auto">
        <div className="flex justify-center gap-8 sm:gap-16 text-gray-700 text-lg font-medium">
          <Link to="/app" className="hover:text-[#0077b6] transition">
            🏠 Início
          </Link>
          <Link to="/app/mapa" className="hover:text-[#0077b6] transition">
            🗺️ Mapa
          </Link>
          <Link to="/app/buscar" className="hover:text-[#0077b6] transition">
            🔍 Buscar
          </Link>
          <Link to="/app/perfil" className="hover:text-[#0077b6] transition">
            👤 Perfil
          </Link>
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          © 2025 Visse? Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}

export default PaginaInicial;