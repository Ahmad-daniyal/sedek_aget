import { Link } from 'react-router-dom';
import StoreMap from '../components/ui/StoreMap.jsx';
import { fallbackStores } from '../data/fallback.js';
import useFetch from '../hooks/useFetch.js';
import { storeService } from '../services/storeService.js';

export default function MapPage() {
  const { data: stores } = useFetch(storeService.stores, 'map-stores', fallbackStores);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="pill">
            <i className="bi bi-map" /> Peta UMKM
          </span>
          <h1>Lihat UMKM di sekitarmu.</h1>
          <p>
            Setiap titik mewakili usaha lokal terverifikasi. Klik penanda untuk melihat nama dan
            alamat usaha.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="map-page">
            <StoreMap stores={stores} height={520} />

            <aside className="map-sidebar">
              <div className="map-sidebar__head">
                <h2>UMKM terdekat</h2>
                <span>{stores.length} usaha</span>
              </div>

              <div className="map-sidebar__list">
                {stores.slice(0, 6).map((store) => (
                  <div className="map-item" key={store.id}>
                    <span className="map-item__icon">
                      <i className="bi bi-shop" />
                    </span>
                    <div>
                      <strong>{store.name}</strong>
                      <span>{store.address}</span>
                    </div>
                    <span className="map-item__rating">
                      <i className="bi bi-star-fill" /> {Number(store.rating || 0).toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>

              <Link to="/jelajah" className="btn-app btn-app--primary btn-app--block">
                Jelajahi semua UMKM
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
