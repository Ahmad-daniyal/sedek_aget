import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/ui/SearchBar.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import StoreCard from '../components/ui/StoreCard.jsx';
import StoreMap from '../components/ui/StoreMap.jsx';
import { fallbackCategories, fallbackStores } from '../data/fallback.js';
import useFetch from '../hooks/useFetch.js';
import { storeService } from '../services/storeService.js';

const stats = [
  { value: '1.200+', label: 'UMKM terdaftar' },
  { value: '25', label: 'Kategori usaha' },
  { value: '4.8', label: 'Rating rata-rata' },
  { value: '92%', label: 'Lolos verifikasi' }
];

const steps = [
  {
    icon: 'bi-search',
    title: 'Temukan UMKM',
    description: 'Cari berdasarkan produk, jasa, kategori, atau lokasi terdekat lewat peta.'
  },
  {
    icon: 'bi-bag-check',
    title: 'Pesan & booking',
    description: 'Belanja langsung, ajukan pre-order, atau booking jadwal layanan.'
  },
  {
    icon: 'bi-patch-check',
    title: 'Transaksi aman',
    description: 'Pembayaran fleksibel dengan verifikasi toko berbasis bukti dan AI.'
  }
];

const aiChecks = [
  'Bukti aktivitas & produk usaha',
  'Foto tempat dan konsistensi lokasi',
  'Deteksi duplikasi serta indikasi risiko',
  'Keputusan bersyarat dan audit admin'
];

export default function HomePage() {
  const { data: stores } = useFetch(storeService.stores, 'home-stores', fallbackStores);
  const { data: categories } = useFetch(
    storeService.categories,
    'home-categories',
    fallbackCategories
  );

  const featured = useMemo(() => stores.slice(0, 6), [stores]);
  const mapStores = useMemo(() => stores.slice(0, 5), [stores]);

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content" data-aos="fade-up">
            <span className="pill">
              <i className="bi bi-patch-check-fill" /> Verifikasi AI untuk semua skala usaha
            </span>
            <h1>
              Temukan <span>UMKM lokal</span> di sekitarmu.
            </h1>
            <p>
              Belanja produk, ajukan pre-order, dan booking layanan dari pedagang di sekitar — dari
              gerobak hingga toko.
            </p>
            <SearchBar large />
            <div className="hero__chips">
              <span>
                <i className="bi bi-check2-circle" /> Terverifikasi berbasis bukti
              </span>
              <span>
                <i className="bi bi-truck" /> Pickup &amp; delivery
              </span>
              <span>
                <i className="bi bi-clock-history" /> Pre-order
              </span>
            </div>
          </div>

          <div className="hero__visual" data-aos="fade-up" data-aos-delay="120">
            <div className="hero-card">
              <div className="hero-card__header">
                <span className="hero-card__dot" />
                <span>Status verifikasi</span>
                <span className="hero-card__badge">Layak disetujui</span>
              </div>
              <div className="hero-card__store">
                <div className="hero-card__logo">BT</div>
                <div>
                  <strong>Warung Bu Tini</strong>
                  <span>
                    <i className="bi bi-geo-alt" /> Cihampelas, Bandung
                  </span>
                </div>
              </div>
              <div className="hero-card__scores">
                <div className="score">
                  <span>Verification Score</span>
                  <strong>92</strong>
                  <div className="score__bar">
                    <span style={{ width: '92%' }} />
                  </div>
                </div>
                <div className="score score--risk">
                  <span>Risk Score</span>
                  <strong>8</strong>
                  <div className="score__bar">
                    <span style={{ width: '8%' }} />
                  </div>
                </div>
              </div>
              <ul className="hero-card__checks">
                <li>
                  <i className="bi bi-check-circle-fill" /> Bukti aktivitas usaha
                </li>
                <li>
                  <i className="bi bi-check-circle-fill" /> Foto produk &amp; tempat
                </li>
                <li>
                  <i className="bi bi-check-circle-fill" /> Konsistensi lokasi
                </li>
              </ul>
            </div>
            <div className="hero-float">
              <i className="bi bi-shield-check" />
              <div>
                <strong>Evidence-based</strong>
                <span>Inklusif untuk usaha mikro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="container stats-strip__grid">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Kategori"
            title="Jelajahi berdasarkan kebutuhan"
            description="Dari makanan hingga jasa, temukan UMKM yang sesuai dengan kebutuhanmu."
          />
          <div className="category-grid">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/jelajah?kategori=${category.slug}`}
                className="category-card"
                data-aos="fade-up"
                data-aos-delay={index * 40}
              >
                <span className="category-card__icon">
                  <i className={`bi ${category.icon || 'bi-grid'}`} />
                </span>
                <span className="category-card__name">{category.name}</span>
                <i className="bi bi-arrow-up-right category-card__arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-row">
            <SectionHeading
              eyebrow="UMKM unggulan"
              title="Usaha lokal pilihan"
              description="Toko terverifikasi dengan bukti usaha yang kuat dan pelanggan puas."
            />
            <Link to="/jelajah" className="text-link">
              Lihat semua <i className="bi bi-arrow-right" />
            </Link>
          </div>
          <div className="store-grid">
            {featured.map((store, index) => (
              <StoreCard key={store.id} store={store} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="ai-panel">
            <div className="ai-panel__content" data-aos="fade-right">
              <span className="pill pill--light">
                <i className="bi bi-stars" /> AI-Powered Verification
              </span>
              <h2>Verifikasi inklusif, bukan hanya dokumen formal.</h2>
              <p>
                AI menilai bukti aktivitas, foto, lokasi, dan konsistensi data — sehingga pedagang
                gerobak pun bisa bergabung dengan percaya diri.
              </p>
              <ul className="ai-list">
                {aiChecks.map((check) => (
                  <li key={check}>
                    <i className="bi bi-check2" /> {check}
                  </li>
                ))}
              </ul>
              <Link to="/daftar" className="btn-app btn-app--light">
                Daftarkan usahamu
              </Link>
            </div>

            <div className="ai-panel__visual" data-aos="fade-left">
              <div className="ai-rules">
                <div className="ai-rule">
                  <span>Bukti aktivitas</span>
                  <span className="ai-rule__ok">Cocok</span>
                </div>
                <div className="ai-rule">
                  <span>Foto produk</span>
                  <span className="ai-rule__ok">Cocok</span>
                </div>
                <div className="ai-rule">
                  <span>Lokasi &amp; GPS</span>
                  <span className="ai-rule__ok">Sesuai</span>
                </div>
                <div className="ai-rule">
                  <span>Duplikasi gambar</span>
                  <span className="ai-rule__safe">Aman</span>
                </div>
                <div className="ai-rule ai-rule--result">
                  <span>Rekomendasi AI</span>
                  <strong>Auto approve</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-row">
            <SectionHeading
              eyebrow="Peta UMKM"
              title="Temukan yang terdekat"
              description="Lihat sebaran UMKM di sekitar lokasimu dan kunjungi langsung."
            />
            <Link to="/peta" className="text-link">
              Buka peta <i className="bi bi-arrow-right" />
            </Link>
          </div>
          <div className="map-panel">
            <StoreMap stores={mapStores} height={400} interactive={false} />
            <div className="map-panel__list">
              {mapStores.slice(0, 4).map((store) => (
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
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Cara kerja"
            title="Tiga langkah mulai belanja"
            description="Cepat, jelas, dan tetap terhubung dengan penjual lokal."
          />
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div
                className="step-card"
                key={step.title}
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <span className="step-card__number">0{index + 1}</span>
                <span className="step-card__icon">
                  <i className={`bi ${step.icon}`} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-panel" data-aos="fade-up">
            <div>
              <h2>Punya usaha? Mari tumbuh bersama.</h2>
              <p>Daftarkan usahamu gratis. Verifikasi inklusif untuk semua skala usaha.</p>
            </div>
            <div className="cta-panel__actions">
              <Link to="/daftar" className="btn-app btn-app--light">
                Daftar sebagai penjual
              </Link>
              <Link to="/jelajah" className="btn-app btn-app--ghost-light">
                Jelajahi UMKM
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
