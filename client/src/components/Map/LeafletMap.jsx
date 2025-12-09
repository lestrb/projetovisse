import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import * as L from 'leaflet';

// Importação das imagens de ícones padrão do Leaflet
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerIcon2xPng from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const BasicMapComponent = ({ children }) => {
  // Define uma posição central padrão (ex: Marco Zero, Recife)
  const defaultCenter = [-8.0631, -34.8711]; 
  const defaultZoom = 13;

  useEffect(() => {
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
      // CORREÇÃO AQUI para o mapa voltar a funcionar
      style={{ height: 'calc(100vh - 160px)', width: '100%', minHeight: '400px', zIndex: 0 }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {children}
    </MapContainer>
  );
};

export default BasicMapComponent;
