import React from 'react';
import { useNavigate } from 'react-router-dom';
import LeafletMap from '../../components/Map/LeafletMap';
import { Marker, Popup } from 'react-leaflet';
import { FiTarget, FiPlus } from 'react-icons/fi';
//import './index.css'; // se houver estilos locais (opcional)

const center = {
  lat: -8.05389,
  lng: -34.88111
};

const leafletCenter = [center.lat, center.lng];

function Home() {
  const navigate = useNavigate();

  const onMapReady = React.useCallback(function callback(map) {
    console.log("Mapa carregado!", map);
  }, []);

  const onMapUnmount = React.useCallback(function callback(map) {
    console.log("Mapa desmontado", map);
  }, []);

  return (
    // O layout de header/footer é responsabilidade do MainLayout;
    // aqui fornecemos o conteúdo (mapa + botões flutuantes).
    <div className="w-full flex-1 flex flex-col bg-gray-100">
      {/* Top bar interna (título + ação) */}
      <div className="w-full px-6 py-4 flex items-center justify-between">
        
      </div>

      {/* Container do mapa */}
      <div
        className="relative w-full flex-1"
        style={{ minHeight: '520px', padding: 24 }}
      >
        <div className="w-full h-full rounded-xl overflow-hidden shadow-md">
          <LeafletMap
            center={leafletCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            onMapReady={onMapReady}
            mapLayer="street"
            onMapUnmount={onMapUnmount}
          >
            <Marker position={leafletCenter}>
              <Popup>Marcador clicável — Recife (padrão)</Popup>
            </Marker>
          </LeafletMap>
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

      {/* Espaço reservado caso queira colocar resumo/rodapé local antes do footer global */}
      <div className="w-full px-6 py-6">
        {/* conteúdo adicional opcional */}
      </div>
    </div>
  );
}

export default Home;