import { Link } from 'react-router-dom';

function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
}

export default function StoreCard({ store, index = 0 }) {
  const primaryCategory = store.categories?.[0];

  return (
    <article className="store-card" data-aos="fade-up" data-aos-delay={index * 60}>
      <div className="store-card__banner">
        <span className="store-card__badge">
          <i className="bi bi-patch-check-fill" /> Terverifikasi
        </span>
        {primaryCategory && <span className="store-card__category">{primaryCategory.name}</span>}
      </div>
      <div className="store-card__body">
        <div className="store-card__logo">{getInitials(store.name)}</div>
        <h3 className="store-card__name">{store.name}</h3>
        <p className="store-card__location">
          <i className="bi bi-geo-alt" /> {store.address}
        </p>
        <p className="store-card__description">{store.description}</p>
        <div className="store-card__meta">
          <span>
            <i className="bi bi-star-fill" /> {Number(store.rating || 0).toFixed(1)}{' '}
            <small>({store.reviewCount})</small>
          </span>
          <span>
            <i className="bi bi-bag" /> {store.productCount} item
          </span>
        </div>
        <Link to="/jelajah" className="store-card__link">
          Lihat toko <i className="bi bi-arrow-right" />
        </Link>
      </div>
    </article>
  );
}
