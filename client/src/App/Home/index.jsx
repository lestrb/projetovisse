import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '600px',
  marginTop: '20px'
};

const center = {
  lat: -23.55052,
  lng: -46.633308
};

function Home() {
  const navigate = useNavigate(); 

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const onLoad = React.useCallback(function callback(map) {
    console.log("Mapa carregado!", map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    console.log("Mapa desmontado", map);
  }, []);

  if (loadError) {
    console.error("Erro ao carregar Google Maps:", loadError);
    return <div>Erro ao carregar o mapa. Verifique sua chave de API e restrições.</div>;
  }

  if (!isLoaded) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        Carregando Mapa...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      
      {}
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Visse?
      </h1>
      <button 
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={() => navigate('/test')}>
        Navegar
      </button>
      
      {}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {}
      </GoogleMap>

    </div>
  );
}

export default Home;