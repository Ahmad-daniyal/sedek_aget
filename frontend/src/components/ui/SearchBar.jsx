import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ large = false }) {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) {
      params.set('q', keyword.trim());
    }
    const query = params.toString();
    navigate(`/jelajah${query ? `?${query}` : ''}`);
  }

  return (
    <form
      className={`search-bar ${large ? 'search-bar--large' : ''}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <i className="bi bi-search search-bar__icon" />
      <input
        type="search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Cari produk, jasa, atau UMKM..."
        aria-label="Cari UMKM"
      />
      <span className="search-bar__divider" />
      <span className="search-bar__location">
        <i className="bi bi-geo-alt" /> Bandung
      </span>
      <button type="submit" className="btn-app btn-app--primary search-bar__submit">
        Cari
      </button>
    </form>
  );
}
