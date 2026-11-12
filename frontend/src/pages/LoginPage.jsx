import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Gagal masuk. Coba lagi.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-section">
      <div className="container auth-layout">
        <div className="auth-aside" data-aos="fade-right">
          <span className="pill pill--light">
            <i className="bi bi-shop-window" /> selamat datang kembali
          </span>
          <h1>Belanja dan kelola usaha dalam satu akun.</h1>
          <p>
            Sebagai pembeli, kamu bisa belanja dan booking. Sebagai penjual, kelola toko, pesanan,
            dan laporan dalam satu dashboard.
          </p>
          <ul className="auth-benefits">
            <li>
              <i className="bi bi-check2-circle" /> Temukan UMKM terverifikasi
            </li>
            <li>
              <i className="bi bi-check2-circle" /> Pre-order dan booking layanan
            </li>
            <li>
              <i className="bi bi-check2-circle" /> Pantau pesanan dan transaksi
            </li>
          </ul>
        </div>

        <div className="auth-card" data-aos="fade-left">
          <h2>Masuk ke akunmu</h2>
          <p className="auth-card__lead">Gunakan email dan password yang terdaftar.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <div className="form-alert" role="alert">
                {error}
              </div>
            )}

            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="nama@email.com"
                autoComplete="email"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                autoComplete="current-password"
                required
              />
            </label>

            <button
              type="submit"
              className="btn-app btn-app--primary btn-app--block"
              disabled={submitting}
            >
              {submitting ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <p className="auth-card__footer">
            Belum punya akun? <Link to="/daftar">Daftar gratis</Link>
          </p>

          <div className="auth-demo">
            <span>Akun demo pembeli</span>
            <code>pembeli@sedekaget.id</code>
            <code>Buyer123!</code>
          </div>
        </div>
      </div>
    </section>
  );
}
