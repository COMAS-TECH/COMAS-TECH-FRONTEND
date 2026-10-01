import './CursoCard.css';

export default function CursoCard({ curso, onInscribirme }) {
  return (
    <article className="curso-card">
      <span className="curso-card__duration">{curso.duration}</span>
      <h3 className="curso-card__title">{curso.title}</h3>
      <p className="curso-card__desc">{curso.description}</p>

      <div className="curso-card__footer">
        <span className="curso-card__price">
          S/ {Number(curso.price).toFixed(2)}
        </span>
        <button
          type="button"
          className="btn btn--sm"
          onClick={() => onInscribirme?.(curso)}
        >
          Inscribirme
        </button>
      </div>
    </article>
  );
}