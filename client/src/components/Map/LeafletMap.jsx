import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import * as L from 'leaflet';

// Importação das imagens de ícones padrão do Leaflet
// Isso é necessário para corrigir um problema comum em bundlers (Webpack, Vite)
// onde os caminhos dos ícones padrão quebram.
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerIcon2xPng from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

/**
 * Um componente de mapa básico do React-Leaflet.
 */
const BasicMapComponent = () => {
  // Define uma posição central padrão (ex: São Paulo, Brasil)
  const defaultCenter = [-23.5505, -46.6333];
  const defaultZoom = 13;

  // Este useEffect corrige o problema dos ícones padrão do Leaflet.
  // Ele é executado apenas uma vez, quando o componente é montado.
  useEffect(() => {
    // O delete é necessário para que o mergeOptions funcione corretamente
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconUrl: markerIconPng,
      iconRetinaUrl: markerIcon2xPng,
      shadowUrl: markerShadowPng,
    });
  }, []);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      // Estilo para fazer o mapa preencher o contêiner
      style={{ height: '100%', width: '100%', borderRadius: '16px' }}
      // Habilita o controle de zoom padrão
      zoomControl={true}
    >
      {/* Camada de mapa (TileLayer) padrão do OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default BasicMapComponent;