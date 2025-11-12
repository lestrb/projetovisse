import React, { useEffect, useCallback } from 'react'; // Importe useEffect e useCallback
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Importe os componentes principais do Leaflet
import * as L from 'leaflet'; // Importe a biblioteca 'L'
import { FiTarget, FiPlus } from 'react-icons/fi';

// Importe o CSS do Leaflet aqui
import 'leaflet/dist/leaflet.css';
// Não vamos importar as imagens .png, pois isso causa o erro de compilação

function Home() {
  const navigate = useNavigate();

  const center = {
    lat: -8.05389,
    lng: -34.88111
  };
  const leafletCenter = [center.lat, center.lng];

  // EFEITO PARA CORRIGIR ÍCONES DO LEAFLET (MUITO IMPORTANTE)
  // Esta é a parte que foi corrigida:
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      // Usamos require() para que o Webpack encontre os caminhos corretos das imagens
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  const onMapReady = useCallback(function callback(map) {
    console.log("Mapa carregado!", map);
  }, []);

  // Note que renomeei a prop "onMapUnmount" para "whenUnmount"
  // E "onMapReady" para "whenReady"
  // (Na verdade, whenUnmount não é uma prop válida, então removi para evitar warnings)
  // a prop 'whenReady' é a correta para o react-leaflet moderno.
  
  return (
    <div className="w-full flex-1 flex flex-col bg-gray-100">
      {/* Top bar interna (título + ação) */}
      <div className="w-full px-6 py-4 flex items-center justify-between">
        {/* ... (você pode adicionar um título aqui mais tarde) ... */}
      </div>

      {/* Container do mapa */}
      <div
        className="relative w-full flex-1"
        style={{ minHeight: '520px', padding: 24 }}
      >
        <div className="w-full h-full rounded-xl overflow-hidden shadow-md">
          {/* Usamos MapContainer diretamente
          */}
          <MapContainer
            center={leafletCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            whenReady={onMapReady} // Prop correta para executar quando o mapa carregar
            zoomControl={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* O Marcador (Marker) agora é um filho direto do MapContainer */}
            <Marker position={leafletCenter}>
              <Popup>Marcador clicável — Recife (padrão)</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Botões flutuantes */}
        <button
          className="absolute bottom-6 left-6 z-20 bg-white p-3 rounded-full shadow-lg text-gray-700 hover:bg-gray-50 transition"
          aria-label="Centralizar mapa"
          title="Centralizar mapa"
          onClick={() => {
            console.log('Centralizar mapa clicado');
          }}
        >
          <FiTarget size={20} />
        </button>

        <button
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-5 rounded-full shadow-lg transition"
          aria-label="Adicionar local"
          title="Adicionar local"
          onClick={() => navigate('/app/adicionar-local')}
        >
          <FiPlus size={18} />
          Adicionar local
        </button>
      </div>

      {/* Espaço reservado */}
      <div className="w-full px-6 py-6">
      </div>
    </div>
  );
}
export default Home;