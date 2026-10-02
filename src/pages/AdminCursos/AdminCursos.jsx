import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses } from '../../api/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { resolveImageUrl } from '../../utils/imageUrl.js';
import './AdminCursos.css';

export default function AdminCursos() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    getCourses()
      .then((data) => {
        const lista = Array.isArray(data) ? data : data.results || [];
        setCursos(lista);
      })
      .catch(() => setError('No se pudieron cargar los cursos'))
      .finally(() => setLoading(false));
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <section className="section">
        <div className="container">
          <p className="text-muted">Cargando cursos...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="admin__header">
          <h1 className="section__title">Gestionar cursos</h1>
          <button
            className="btn btn--sm btn--ghost"
            type="button"
            onClick={() => navigate('/admin')}
          >
            ← Volver al panel
          </button>
        </div>

        {error && <p className="text-error">{error}</p>}

        {cursos.length === 0 && !error && (
          <p className="text-muted">No hay cursos registrados.</p>
        )}

        <div className="admin-cursos__grid">
          {cursos.map((c) => {
            const img = resolveImageUrl(c.image_url);
            return (
              <article key={c.id} className="admin-cursos__card">
                <div className="admin-cursos__media">
                  {img ? (
                    <img
                      src={img}
                      alt={c.title}
                      className="admin-cursos__img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="admin-cursos__placeholder">
                      Sin portada
                    </div>
                  )}
                </div>
                <div className="admin-cursos__body">
                  <span className="admin-cursos__cat">{c.category}</span>
                  <h3 className="admin-cursos__title">{c.title}</h3>
                  <div className="admin-cursos__footer">
                    <span className="admin-cursos__price">
                      S/ {Number(c.price).toFixed(2)}
                    </span>
                    <button
                      className="btn btn--sm"
                      type="button"
                      onClick={() => navigate(`/admin/cursos/${c.id}`)}
                    >
                      Editar portada
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}