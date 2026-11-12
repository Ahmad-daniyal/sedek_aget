import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="notfound">
      <div className="container notfound__inner">
        <span className="notfound__code">404</span>
        <h1>Halaman tidak ditemukan</h1>
        <p>Sepertinya halaman yang kamu cari sudah dipindahkan atau belum tersedia.</p>
        <Link to="/" className="btn-app btn-app--primary">
          Kembali ke beranda
        </Link>
      </div>
    </section>
  );
}
