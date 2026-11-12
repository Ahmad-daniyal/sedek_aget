import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const initialForm = { name: '', email: '', phone: '', password: '' };

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
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
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Gagal mendaftar. Coba lagi.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-section">
      <div className="container auth-layout">
        <div className="auth-aside" data-aos="fade-right">
          <span className="pill pill--light">
            <i className="bi bi-stars" /> gratis untuk semua skala usaha
          </span>
          <h1>Satu akun untuk belanja dan berjualan.</h1>
          <p>
            Mulai sebagai pembeli, lalu ajukan usahamu kapan saja. Verifikasi berbasis bukti membuat
            usaha mikro tetap punya kesempatan yang sama.
          </p>
          <ul className="auth-benefits">
            <li>
              <i className="bi bi-check2-circle" /> Tanpa biaya pendaftaran
            </li>
            <li>
              <i className="bi bi-check2-circle" /> Verifikasi inklusif berbasis bukti
            </li>
            <li>
              <i className="bi bi-check2-circle" /> Kelola toko dari satu dashboard
            </li>
          </ul>
        </div>

        <div className="auth-card" data-aos="fade-left">
          <h2>Buat akun baru</h2>
          <p className="auth-card__lead">Isi data di bawah untuk mulai menggunakan sedek_aget.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <div className="form-alert" role="alert">
                {error}
              </div>
            )}

            <label>
              Nama lengkap
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nama kamu"
                autoComplete="name"
                minLength={2}
                required
              />
            </label>

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
              Nomor telepon <span>(opsional)</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
                autoComplete="tel"
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimal 8 karakter"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </label>

            <button
              type="submit"
              className="btn-app btn-app--primary btn-app--block"
              disabled={submitting}
            >
              {submitting ? 'Memproses...' : 'Daftar sekarang'}
            </button>
          </form>

          <p className="auth-card__footer">
            Sudah punya akun? <Link to="/masuk">Masuk di sini</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
