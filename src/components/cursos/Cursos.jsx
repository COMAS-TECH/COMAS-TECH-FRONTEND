import { useEffect, useState } from 'react';
import CursoCard from '../cursoCard/CursoCard.jsx';
import { getCourses } from '../../api/api.js';
import './Cursos.css';

export default function Cursos({ onInscribirme, limit }) {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    getCourses()
      .then((data) => {
        if (!activo) return;
        // data puede ser array directo o { results: [...] }
        const lista = Array.isArray(data) ? data : data.results || [];
        setCursos(limit ? lista.slice(0, limit) : lista);
      })
      .catch((err) => {
        if (!activo) return;
        console.error('Error al cargar cursos:', err);
        setError('No se pudieron cargar los cursos. Verifica que el backend esté corriendo.');
      })
      .finally(() => {
        if (activo) setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, [limit]);

  if (loading) {
    return <p className="text-muted cursos__status">Cargando cursos...</p>;
  }

  if (error) {
    return <p className="text-error cursos__status">{error}</p>;
  }

  if (cursos.length === 0) {
    return (
      <p className="text-muted cursos__status">
        No hay cursos disponibles por el momento.
      </p>
    );
  }

  return (
    <div className="cursos__grid">
      {cursos.map((curso) => (
        <CursoCard
          key={curso.id}
          curso={curso}
          onInscribirme={onInscribirme}
        />
      ))}
    </div>
  );
}