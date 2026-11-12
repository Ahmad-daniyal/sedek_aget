import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState.jsx';
import StoreCard from '../components/ui/StoreCard.jsx';
import { fallbackCategories, fallbackStores } from '../data/fallback.js';
import useFetch from '../hooks/useFetch.js';
import { storeService } from '../services/storeService.js';

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';
  const activeCategory = searchParams.get('kategori') || 'all';

  const { data: stores } = useFetch(storeService.stores, 'explore-stores', fallbackStores);
  const { data: categories } = useFetch(
    storeService.categories,
    'explore-categories',
    fallbackCategories
  );

  const filteredStores = useMemo(() => {
    const term = keyword.trim().toLowerCase();

    return stores.filter((store) => {
      const matchesKeyword =
        !term ||
        [store.name, store.description, store.address].some((value) =>
          value?.toLowerCase().includes(term)
        );

      const matchesCategory =
        activeCategory === 'all' ||
        store.categories?.some((category) => category.slug === activeCategory);

      return matchesKeyword && matchesCategory;
    });
  }, [stores, keyword, activeCategory]);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);

    if (!value || value === 'all') {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    setSearchParams(next, { replace: true });
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="pill">
            <i className="bi bi-compass" /> Jelajahi UMKM
          </span>
          <h1>Temukan usaha lokal di sekitarmu.</h1>
          <p>
            Filter berdasarkan kategori atau cari langsung nama usaha, produk, dan lokasi yang kamu
            butuhkan.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="filter-panel">
            <div className="filter-search">
              <i className="bi bi-search" />
              <input
                type="search"
                value={keyword}
                onChange={(event) => updateParam('q', event.target.value)}
                placeholder="Cari nama usaha, produk, atau lokasi..."
                aria-label="Cari UMKM"
              />
            </div>

            <div className="filter-chips">
              <button
                type="button"
                className={activeCategory === 'all' ? 'is-active' : ''}
                onClick={() => updateParam('kategori', 'all')}
              >
                Semua
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={activeCategory === category.slug ? 'is-active' : ''}
                  onClick={() => updateParam('kategori', category.slug)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="results-row">
            <span>
              <strong>{filteredStores.length}</strong> UMKM ditemukan
            </span>
            <Link to="/peta" className="text-link">
              Lihat di peta <i className="bi bi-map" />
            </Link>
          </div>

          {filteredStores.length > 0 ? (
            <div className="store-grid">
              {filteredStores.map((store, index) => (
                <StoreCard key={store.id} store={store} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="bi-shop"
              title="Belum ada UMKM yang cocok"
              description="Coba kata kunci lain atau pilih kategori yang berbeda."
            />
          )}
        </div>
      </section>
    </>
  );
}
