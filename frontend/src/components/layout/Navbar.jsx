import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

const navLinks = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/jelajah', label: 'Jelajahi UMKM' },
  { to: '/peta', label: 'Peta UMKM' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    setOpen(false);
    navigate('/');
  }

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__mark">
            <i className="bi bi-shop-window" />
          </span>
          <span className="brand__text">
            sedek<span>_aget</span>
          </span>
        </Link>

        <nav className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `site-nav__link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          <div className="site-nav__actions">
            {user ? (
              <>
                <span className="site-nav__user">
                  <i className="bi bi-person-circle" /> {user.name}
                </span>
                <button type="button" className="btn-app btn-app--ghost" onClick={handleLogout}>
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link to="/masuk" className="btn-app btn-app--ghost" onClick={() => setOpen(false)}>
                  Masuk
                </Link>
                <Link to="/daftar" className="btn-app btn-app--primary" onClick={() => setOpen(false)}>
                  Daftar
                </Link>
              </>
            )}
          </div>
        </nav>

        <button
          type="button"
          className="site-header__toggle"
          aria-label="Buka menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <i className={`bi ${open ? 'bi-x-lg' : 'bi-list'}`} />
        </button>
      </div>
    </header>
  );
}
