import React from "react";
import "./PaginaInicial.css";

function PaginaInicial() {
  return (
    <div className="pagina-inicial font-inter text-gray-900 min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="header w-full bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white py-6 px-16 flex flex-col items-start justify-center shadow-md">
        <h1 className="text-5xl font-extrabold tracking-tight">Visse?</h1>
        <p className="text-lg font-medium mt-1 opacity-90">
          Porque a cultura pulsa em cada esquina!
        </p>
      </header>

      {/* EXPLORAR MAPA */}
      <section className="explorar-mapa w-full bg-gradient-to-r from-[#38b000] to-[#70e000] py-4 text-center shadow-md">
        <button className="text-white text-lg font-semibold tracking-wide hover:opacity-90 transition">
          🗺️ Explorar mapa
        </button>
      </section>

      {/* SEÇÃO BOMBANDO */}
      <section className="bombando flex flex-col items-center py-12 px-16 bg-white">
        <h2 className="text-3xl font-bold text-[#0077b6] mb-10">
          Bombando 🔥
        </h2>

        <div className="grid grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="card-bombando bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition transform">
            <img
              src="https://imagens.ne10.uol.com.br/veiculos/_midias/jpg/2024/10/02/img_4476-32921678.jpeg"
              alt="Sovaj Veg Bar"
              className="h-60 w-full object-cover"
            />
            <div className="p-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg">Sovaj Veg Bar</h3>
              <span className="text-yellow-500 text-xl">⭐ 4.8</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card-bombando bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition transform">
            <img
              src="https://ton.x.com/i/ton/data/dm/1988061385616748852/1988061377458475008/f2eU1eTD.png:medium"
              alt="Rua da Feira"
              className="h-60 w-full object-cover"
            />
            <div className="p-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg">Rua da Feira</h3>
              <span className="text-yellow-500 text-xl">⭐ 4.6</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card-bombando bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition transform">
            <img
              src="https://cdn.folhape.com.br/img/pc/1100/1/dn_arquivo/2025/04/whatsapp-image-2025-04-04-at-184205.jpg"
              alt="Feira na Laje"
              className="h-60 w-full object-cover"
            />
            <div className="p-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg">Feira na Laje</h3>
              <span className="text-yellow-500 text-xl">⭐ 4.9</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO GANHE PONTOS CAPIBA */}
      <section className="ganhe-pontos bg-gradient-to-r from-[#f3722c] to-[#f8961e] py-14 px-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-8">Ganhe Pontos Capiba 💰</h2>
        <p className="text-lg mb-10 opacity-95">
          Agora é fácil: basta cadastrar um local ou visitar um ponto cultural
          para acumular seus pontos!
        </p>

        <div className="flex justify-center gap-10">
          <button className="btn-capiba bg-white text-[#f3722c] font-semibold text-lg py-4 px-8 rounded-xl shadow-md hover:scale-105 transition">
            🏛️ Cadastrar Local
          </button>
          <button className="btn-capiba bg-white text-[#f3722c] font-semibold text-lg py-4 px-8 rounded-xl shadow-md hover:scale-105 transition">
            🚶‍♀️ Visitar Local
          </button>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="footer bg-white shadow-inner py-4 mt-auto">
        <div className="flex justify-center gap-16 text-gray-700 text-lg font-medium">
          <a href="#inicio" className="hover:text-[#0077b6] transition">
            🏠 Início
          </a>
          <a href="#mapa" className="hover:text-[#0077b6] transition">
            🗺️ Mapa
          </a>
          <a href="#buscar" className="hover:text-[#0077b6] transition">
            🔍 Buscar
          </a>
          <a href="#perfil" className="hover:text-[#0077b6] transition">
            👤 Perfil
          </a>
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          © 2025 Visse? Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}

export default PaginaInicial;
