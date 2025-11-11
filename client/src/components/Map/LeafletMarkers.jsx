import React, { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Helper para criar ícone customizado (opcional)
export function createIcon({ iconUrl, iconSize = [25, 41], iconAnchor = [12, 41], shadowUrl } = {}) {
  const options = {};
  if (iconUrl) options.iconUrl = iconUrl;
  if (shadowUrl) options.shadowUrl = shadowUrl;
  options.iconSize = iconSize;
  options.iconAnchor = iconAnchor;
  return L.icon(options);
}

export default function LeafletMarkers({
  markers = [], // [{ id, lat, lng, title, description, icon }]
  onMarkerClick = null,
  fitBounds = true,
  boundsPadding = [50, 50],
  popupRenderer = (m) => (
    <div>
      <strong>{m.title}</strong>
      {m.description && <div>{m.description}</div>}
    </div>
  ),
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (!fitBounds) return;
    if (!markers || markers.length === 0) return;

    const latlngs = markers.map((m) => [m.lat, m.lng]);
    try {
      const bounds = L.latLngBounds(latlngs);
      map.fitBounds(bounds, { padding: boundsPadding });
    } catch (e) {
      // silencioso
    }
  }, [map, markers, fitBounds, boundsPadding]);

  return (
    <>
      {markers.map((m) => {
        const position = [m.lat, m.lng];
        const icon = m.icon ? createIcon(m.icon) : undefined;
        return (
          <Marker
            key={m.id ?? `${m.lat}-${m.lng}`}
            position={position}
            icon={icon}
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