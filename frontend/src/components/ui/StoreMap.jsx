import { APIProvider, InfoWindow, Map, Marker } from '@vis.gl/react-google-maps';
import { useMemo, useState } from 'react';

const DEFAULT_CENTER = { lat: -6.9147, lng: 107.6098 };

const markerIcon = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34"><path d="M17 2C10.4 2 5 7.4 5 14c0 8.6 12 18 12 18s12-9.4 12-18c0-6.6-5.4-12-12-12Z" fill="#059669" stroke="#ffffff" stroke-width="2.5"/><circle cx="17" cy="14" r="4.5" fill="#ffffff"/></svg>'
)}`;

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeStores(stores) {
  return stores
    .map((store) => {
      const latitude = toNumber(store.latitude);
      const longitude = toNumber(store.longitude);

      if (latitude === null || longitude === null) {
        return null;
      }

      return { ...store, latitude, longitude };
    })
    .filter(Boolean);
}

export default function StoreMap({ stores = [], height = 420, zoom = 12, interactive = true }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const points = useMemo(() => normalizeStores(stores), [stores]);
  const center = points.length
    ? { lat: points[0].latitude, lng: points[0].longitude }
    : DEFAULT_CENTER;
  const [activeStoreId, setActiveStoreId] = useState(null);
  const activeStore = points.find((store) => store.id === activeStoreId);

  if (!apiKey) {
    const embedUrl = `https://www.google.com/maps?q=${center.lat},${center.lng}&z=${zoom}&output=embed`;

    return (
      <div className="store-map" style={{ height }}>
        <iframe
          title="Peta UMKM"
          src={embedUrl}
          className="store-map__canvas"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0, pointerEvents: interactive ? 'auto' : 'none' }}
        />
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
