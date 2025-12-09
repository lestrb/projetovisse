import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Importando as imagens aqui
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerIcon2xPng from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// Criando um objeto de ícone fixo
const DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  iconRetinaUrl: markerIcon2xPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Helper para ícones customizados
export function createIcon({ iconUrl, iconSize = [25, 41], iconAnchor = [12, 41], shadowUrl } = {}) {
  return L.icon({
    iconUrl,
    shadowUrl: shadowUrl || markerShadowPng, // Usa sombra padrão se não tiver
    iconSize,
    iconAnchor,
  });
}

export default function LeafletMarkers({
  markers = [],
  onMarkerClick = null,
  popupRenderer = (m) => (
    <div>
      <strong className="text-sm text-gray-800">{m.title}</strong>
      {m.description && <div className="text-xs text-gray-500 mt-1">{m.description}</div>}
    </div>
  ),
}) {
  
  return (
    <>
      {markers.map((m) => {
        const position = [m.lat, m.lng];
        
        // Ou usa o customizado, ou usa o DefaultIcon
        const iconToUse = m.icon ? createIcon(m.icon) : DefaultIcon;

        return (
          <Marker
            key={m.id ?? `${m.lat}-${m.lng}`}
            position={position}
            icon={iconToUse} 
            eventHandlers={{
              click: () => onMarkerClick?.(m),
            }}
          >
            <Popup>{popupRenderer(m)}</Popup>
          </Marker>
        );
      })}
    </>
  );
}
