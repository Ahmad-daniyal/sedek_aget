import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" className="brand">
              <span className="brand__mark">
                <i className="bi bi-shop-window" />
              </span>
              <span className="brand__text">
                sedek<span>_aget</span>
              </span>
            </Link>
            <p>
              Menghubungkan masyarakat dengan UMKM lokal di sekitarnya — inklusif, terverifikasi,
              dan mudah diakses.
            </p>
          </div>

          <div className="site-footer__col">
            <h4>Jelajahi</h4>
            <Link to="/jelajah">Semua UMKM</Link>
            <Link to="/peta">Peta UMKM</Link>
            <Link to="/daftar">Daftar Usaha</Link>
          </div>

          <div className="site-footer__col">
            <h4>Untuk UMKM</h4>
            <span>Verifikasi AI</span>
            <span>Pre-order</span>
            <span>Booking layanan</span>
          </div>

          <div className="site-footer__col">
            <h4>Kontak</h4>
            <span>
              <i className="bi bi-envelope" /> halo@sedekaget.id
            </span>
            <span>
              <i className="bi bi-geo-alt" /> Bandung, Indonesia
            </span>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} sedek_aget. Dibuat untuk UMKM lokal.</span>
          <span>Subtema EKRAF — INFORMIND FEST VOL. II</span>
        </div>
      </div>
    </footer>
  );
}
