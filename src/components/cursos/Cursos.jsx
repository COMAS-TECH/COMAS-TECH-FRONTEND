import { useEffect, useState } from 'react';
import { getCourses } from '../../api/api.js';
import CursoCard from '../cursoCard/CursoCard.jsx';
import './Cursos.css';

export default function Cursos({ onInscribirme }) {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    getCourses()
      .then((data) => {
        if (mounted) setCursos(data);
      })
      .catch(() => {
        if (mounted)
          setError(
            'No se pudieron cargar los cursos. Verifica que el backend esté en ejecución.'
          );
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="cursos" className="section">
      <div className="container">
        <h2 className="section__title">Nuestros cursos</h2>
        <p className="section__subtitle">
          Elige el curso, revisa su plan de pago y matrículate sin necesidad de
          crear una cuenta.
        </p>

        {loading && <p className="text-muted cursos__status">Cargando cursos...</p>}
        {error && <p className="text-error cursos__status">{error}</p>}

        {!loading && !error && (
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
    </section>
  );
}