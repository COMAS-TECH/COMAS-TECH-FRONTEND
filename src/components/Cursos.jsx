import { useEffect, useState } from 'react';
import { getCourses } from '../api/api.js';
import CursoCard from './CursoCard.jsx';

export default function Cursos({ onInscribirme }) {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCourses()
      .then(setCursos)
      .catch(() => setError('No se pudieron cargar los cursos. Verifica que el backend este corriendo.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="cursos" className="section">
      <div className="container">
        <h2 className="section__title">Nuestros cursos</h2>
        <p className="section__subtitle">
          Elige el curso, revisa su plan de pago y matriculate sin necesidad de crear una cuenta.
        </p>

        {loading && <p className="text-muted">Cargando cursos...</p>}
        {error && <p className="text-error">{error}</p>}

        {!loading && !error && (
          <div className="grid grid--cursos">
            {cursos.map((curso) => (
              <CursoCard key={curso.id} curso={curso} onInscribirme={onInscribirme} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
