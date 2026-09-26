export default function CursoCard({ curso, onInscribirme }) {
  return (
    <article className="curso-card">
      <div className="curso-card__img">
        <img
          src={curso.image_url || '/images/curso-default.jpg'}
          alt={curso.title}
          onError={(e) => { e.currentTarget.src = '/images/curso-default.jpg'; }}
        />
        {curso.has_certification && (
          <span className="curso-card__cert">🎓 Con certificacion</span>
        )}
      </div>

      <div className="curso-card__body">
        <span className="curso-card__categoria">{curso.category}</span>
        <h3>{curso.title}</h3>
        <p>{curso.description}</p>

        <div className="curso-card__meta">
          <span>⏱ {curso.duration_weeks} semanas</span>
          <span>💻 {curso.modality}</span>
        </div>

        {curso.payment_plans?.length > 0 && (
          <div className="curso-card__planes">
            <strong>Planes de pago:</strong>
            <ul>
              {curso.payment_plans.map((plan) => (
                <li key={plan.id}>
                  {plan.name}: S/ {Number(plan.total_amount).toFixed(2)}
                  {plan.installments > 1 ? ` (${plan.installments} cuotas)` : ''}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="curso-card__footer">
          <span className="curso-card__precio">S/ {Number(curso.price).toFixed(2)}</span>
          <button className="btn btn--sm" onClick={() => onInscribirme(curso)}>
            Inscribirme
          </button>
        </div>
      </div>
    </article>
  );
}
