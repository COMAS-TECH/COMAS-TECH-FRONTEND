import './CursoCard.css';

export default function CursoCard({ curso, onInscribirme }) {
  const planes = curso.payment_plans || [];

  return (
    <article className="curso-card">
      <div className="curso-card__media">
        <img
          src={curso.image_url || '/images/curso-default.jpg'}
          alt={curso.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/images/curso-default.jpg';
          }}
        />
        {curso.has_certification && (
          <span className="curso-card__badge">Certificación</span>
        )}
      </div>

      <div className="curso-card__body">
        <span className="curso-card__category">{curso.category}</span>
        <h3 className="curso-card__title">{curso.title}</h3>
        <p className="curso-card__desc">{curso.description}</p>

        <div className="curso-card__meta">
          <span>{curso.duration_weeks} semanas</span>
          <span className="curso-card__dot" />
          <span>{curso.modality}</span>
        </div>

        {planes.length > 0 && (
          <div className="curso-card__plans">
            <strong>Planes de pago</strong>
            <ul>
              {planes.map((plan) => (
                <li key={plan.id}>
                  <span>{plan.name}</span>
                  <span>S/ {Number(plan.total_amount).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="curso-card__footer">
          <div className="curso-card__price">
            <span className="curso-card__price-label">Desde</span>
            <span className="curso-card__price-value">
              S/ {Number(curso.price).toFixed(2)}
            </span>
          </div>
          <button
            type="button"
            className="btn btn--sm"
            onClick={() => onInscribirme(curso)}
          >
            Inscribirme
          </button>
        </div>
      </div>
    </article>
  );
}