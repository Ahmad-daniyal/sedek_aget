export default function EmptyState({ icon = 'bi-inbox', title, description }) {
  return (
    <div className="empty-state">
      <i className={`bi ${icon}`} />
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}
