import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders, getMyCourses } from '../../api/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import './MisCursosPage.css';

export default function MisCursosPage() {
  const { user } = useAuth();
  const [cursos, setCursos] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    Promise.all([getMyCourses(), getMyOrders()])
      .then(([c, o]) => {
        setCursos(c);
        setOrders(o);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <section className="section">
        <div className="container">
          <h1 className="section__title">Mis cursos</h1>
          <p className="text-muted" style={{ textAlign: 'center' }}>
            Debes iniciar sesion para ver tus cursos.
          </p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <p className="text-muted" style={{ textAlign: 'center' }}>
            Cargando...
          </p>
        </div>
      </section>
    );
  }

  const pendientes = orders.filter(
    (o) => o.status === 'pendiente' || o.status === 'en_revision'
  );

  return (
    <section className="section">
      <div className="container">
        <h1 className="section__title">Mis cursos</h1>
        <p className="section__subtitle">
          Hola {user.full_name}, aqui estan tus cursos activos.
        </p>

        {cursos.length === 0 ? (
          <p className="text-muted" style={{ textAlign: 'center' }}>
            Aun no tienes cursos abiertos.{' '}
            <Link to="/cursos">Ver cursos disponibles</Link>
          </p>
        ) : (
          <div className="mis-cursos__grid">
            {cursos.map((c) => (
              <article key={c.enrollment_id} className="mis-cursos__card">
                {c.image_url && <img src={c.image_url} alt={c.title} />}
                <h3>{c.title}</h3>
                <p className="text-muted">{c.description}</p>
                <span className="mis-cursos__badge">Abierto</span>
              </article>
            ))}
          </div>
        )}

        {pendientes.length > 0 && (
          <>
            <h2 className="section__title mis-cursos__h2">
              Inscripciones pendientes
            </h2>
            <ul className="mis-cursos__pending">
              {pendientes.map((o) => (
                <li key={o.id}>
                  <strong>{o.course_title}</strong>
                  <span className={`status status--${o.status}`}>
                    {o.status.replace('_', ' ')}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}