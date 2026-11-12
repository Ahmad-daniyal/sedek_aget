import { APIProvider, InfoWindow, Map, Marker } from '@vis.gl/react-google-maps';
import { useState } from 'react';

const DEFAULT_CENTER = { lat: -6.9147, lng: 107.6098 };

const markerIcon = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34"><path d="M17 2C10.4 2 5 7.4 5 14c0 8.6 12 18 12 18s12-9.4 12-18c0-6.6-5.4-12-12-12Z" fill="#059669" stroke="#ffffff" stroke-width="2.5"/><circle cx="17" cy="14" r="4.5" fill="#ffffff"/></svg>'
)}`;

export default function StoreMap({ stores = [], height = 420, zoom = 12, interactive = true }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [activeStoreId, setActiveStoreId] = useState(null);
  const points = stores.filter((store) => store.latitude != null && store.longitude != null);
  const center = points.length
    ? { lat: points[0].latitude, lng: points[0].longitude }
    : DEFAULT_CENTER;
  const activeStore = points.find((store) => store.id === activeStoreId);

  if (!apiKey) {
    return (
      <div className="store-map" style={{ height }}>
        <div className="store-map__fallback">
          <i className="bi bi-map" />
          <strong>Peta belum tersedia</strong>
          <span>Tambahkan VITE_GOOGLE_MAPS_API_KEY pada file .env frontend.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="store-map" style={{ height }}>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          className="store-map__canvas"
          draggable={interactive}
          gestureHandling={interactive ? 'auto' : 'none'}
          disableDefaultUI={!interactive}
          scrollwheel={interactive}
        >
          {points.map((store) => (
            <Marker
              key={store.id}
              position={{ lat: store.latitude, lng: store.longitude }}
              icon={markerIcon}
              title={store.name}
              onClick={() => setActiveStoreId(store.id)}
            />
          ))}

          {activeStore && (
            <InfoWindow
              position={{ lat: activeStore.latitude, lng: activeStore.longitude }}
              onCloseClick={() => setActiveStoreId(null)}
            >
              <strong>{activeStore.name}</strong>
              <br />
              {activeStore.address}
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
