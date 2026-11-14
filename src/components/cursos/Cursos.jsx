import { useEffect, useState } from 'react';
import CursoCard from '../cursoCard/CursoCard.jsx';
import { getCourses } from '../../api/api.js';
import './Cursos.css';

export default function Cursos({ onInscribirme, limit, title, subtitle }) {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    getCourses()
      .then((data) => {
        if (!activo) return;
        const lista = Array.isArray(data) ? data : data.results || [];
        setCursos(limit ? lista.slice(0, limit) : lista);
      })
      .catch((err) => {
        if (!activo) return;
        console.error('Error al cargar cursos:', err);
        setError(
          'No se pudieron cargar los cursos. Verifica que el backend este corriendo.'
        );
      })
      .finally(() => {
        if (activo) setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, [limit]);

  return (
    <div className="cursos">
      {(title || subtitle) && (
        <header className="cursos__header">
          {title && <h2 className="cursos__title">{title}</h2>}
          {subtitle && <p className="cursos__subtitle">{subtitle}</p>}
        </header>
      )}

      {!loading && !error && cursos.length > 0 && (
        <div className="cursos__meta">
          <span className="cursos__count">
            {cursos.length} {cursos.length === 1 ? 'curso' : 'cursos'}
          </span>
        </div>
      )}

      {loading && (
        <div className="cursos__grid" aria-busy="true">
          {Array.from({ length: limit || 6 }).map((_, i) => (
            <div className="cursos__skeleton" key={i}>
              <div className="cursos__skeleton-media" />
              <div className="cursos__skeleton-body">
                <div className="cursos__skeleton-line cursos__skeleton-line--sm" />
                <div className="cursos__skeleton-line" />
                <div className="cursos__skeleton-line cursos__skeleton-line--lg" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="cursos__state cursos__state--error">
          <p className="cursos__state-title">No se pudieron cargar los cursos</p>
          <p className="cursos__state-text">{error}</p>
        </div>
      )}

      {!loading && !error && cursos.length === 0 && (
        <div className="cursos__state">
          <p className="cursos__state-title">Sin cursos disponibles</p>
          <p className="cursos__state-text">
            Vuelve pronto, estamos preparando nuevos cursos.
          </p>
        </div>
      )}

      {!loading && !error && cursos.length > 0 && (
        <div className="cursos__grid">
          {cursos.map((curso) => (
            <CursoCard
              key={curso.id}
              curso={curso}
              onInscribirme={onInscribirme}
            />
          ))}
        </div>
      )}
    </div>
  );
}