import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const DEFAULT_CENTER = [-6.9147, 107.6098];

const markerIcon = L.divIcon({
  className: 'store-marker',
  html: '<span class="store-marker__dot"></span>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -10]
});

export default function StoreMap({ stores = [], height = 420, zoom = 12, interactive = true }) {
  const points = stores.filter((store) => store.latitude != null && store.longitude != null);
  const center = points.length ? [points[0].latitude, points[0].longitude] : DEFAULT_CENTER;

  return (
    <div className="store-map" style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={interactive}
        dragging={interactive}
        className="store-map__canvas"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((store) => (
          <Marker key={store.id} position={[store.latitude, store.longitude]} icon={markerIcon}>
            <Popup>
              <strong>{store.name}</strong>
              <br />
              {store.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
