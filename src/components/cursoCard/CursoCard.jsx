import { resolveImageUrl } from '../../utils/imageUrl.js';
import './CursoCard.css';

export default function CursoCard({ curso, onInscribirme }) {
  const imgSrc = resolveImageUrl(curso.image_url);

  return (
    <article className="curso-card">
      {/* Marco de la foto */}
      <div className="curso-card__media">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={curso.title}
            className="curso-card__img"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement.classList.add('is-empty');
            }}
          />
        ) : (
          <div className="curso-card__placeholder">Sin portada</div>
        )}
      </div>

      {/* Texto debajo de la foto */}
      <div className="curso-card__body">
        <span className="curso-card__duration">
          {curso.duration_weeks
            ? `${curso.duration_weeks} semanas`
            : curso.duration || ''}
          {curso.modality ? ` · ${curso.modality}` : ''}
        </span>

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
      </div>
    </article>
  );
}