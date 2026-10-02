import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  adminStats,
  adminListOrders,
  adminUpdateOrder,
} from '../../api/api.js';
import { resolveImageUrl } from '../../utils/imageUrl.js';
import './AdminPage.css';

export default function AdminPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;
    setLoading(true);
    Promise.all([
      adminStats(),
      adminListOrders(filter || undefined),
    ])
      .then(([s, o]) => {
        if (!activo) return;
        setStats(s);
        setOrders(o);
      })
      .catch((err) => {
        if (!activo) return;
        console.error('Error cargando admin:', err);
        setError('No se pudieron cargar los datos');
      })
      .finally(() => {
        if (activo) setLoading(false);
      });
    return () => {
      activo = false;
    };
  }, [filter]);

  const load = async () => {
    setLoading(true);
    try {
      const [s, o] = await Promise.all([
        adminStats(),
        adminListOrders(filter || undefined),
      ]);
      setStats(s);
      setOrders(o);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    await adminUpdateOrder(id, { status: 'pagado' });
    load();
  };

  const handleReject = async (id) => {
    const notes = prompt('Motivo del rechazo (opcional):') || '';
    await adminUpdateOrder(id, { status: 'rechazado', admin_notes: notes });
    load();
  };

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <p className="text-muted">Cargando panel...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="admin__header">
          <h1 className="section__title">Panel de administrador</h1>
          <div className="admin__header-actions">
            <button
              className="btn btn--sm btn--ghost"
              type="button"
              onClick={() => navigate('/cursos')}
            >
              Ver catálogo
            </button>
            <button
              className="btn btn--sm btn--ghost"
              type="button"
              onClick={() => navigate('/admin/video')}
            >
              Video de la Home
            </button>
            <button
              className="btn btn--sm"
              type="button"
              onClick={() => navigate('/admin/cursos')}
            >
              Gestionar cursos
            </button>
          </div>
        </div>

        {error && <p className="text-error">{error}</p>}

        {stats && (
          <div className="admin__stats">
            <div className="admin__stat">
              <span>{stats.total_users}</span>
              <p>Usuarios</p>
            </div>
            <div className="admin__stat">
              <span>{stats.total_orders}</span>
              <p>Órdenes</p>
            </div>
            <div className="admin__stat">
              <span>{stats.pending_orders}</span>
              <p>Pendientes</p>
            </div>
            <div className="admin__stat">
              <span>{stats.paid_orders}</span>
              <p>Pagadas</p>
            </div>
            <div className="admin__stat">
              <span>S/ {Number(stats.total_revenue).toFixed(2)}</span>
              <p>Ingresos</p>
            </div>
          </div>
        )}

        <div className="admin__filters">
          {['', 'pendiente', 'en_revision', 'pagado', 'rechazado'].map((s) => (
            <button
              key={s || 'todas'}
              className={`admin__filter ${filter === s ? 'is-active' : ''}`}
              onClick={() => setFilter(s)}
              type="button"
            >
              {s || 'Todas'}
            </button>
          ))}
        </div>

        <div className="admin__table-wrap">
          <table className="admin__table">
            <thead>
              <tr>
                <th>#</th>
                <th>Usuario</th>
                <th>Curso</th>
                <th>Método</th>
                <th>Monto</th>
                <th>Comprobante</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '24px' }}>
                    <span className="text-muted">Sin órdenes</span>
                  </td>
                </tr>
              )}
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>
                    <div>{o.user_full_name || o.full_name}</div>
                    <small className="text-muted">{o.email}</small>
                  </td>
                  <td>
                    <div className="admin__course-cell">
                      {o.course_image_url && (
                        <img
                          src={resolveImageUrl(o.course_image_url)}
                          alt={o.course_title}
                          className="admin__course-thumb"
                          loading="lazy"
                        />
                      )}
                      <div className="admin__course-info">
                        <strong>{o.course_title}</strong>
                        {o.course_id && (
                          <button
                            className="admin__link-btn"
                            type="button"
                            onClick={() =>
                              navigate(`/admin/cursos/${o.course_id}`)
                            }
                          >
                            Editar portada
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{o.payment_method}</td>
                  <td>S/ {Number(o.amount).toFixed(2)}</td>
                  <td>
                    {o.receipt_url ? (
                      <a
                        href={resolveImageUrl(o.receipt_url)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver
                      </a>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td>
                    <span className={`status status--${o.status}`}>
                      {o.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="admin__actions">
                    {o.status !== 'pagado' && (
                      <button
                        className="btn btn--sm"
                        onClick={() => handleApprove(o.id)}
                        type="button"
                      >
                        Aprobar
                      </button>
                    )}
                    {o.status !== 'rechazado' && (
                      <button
                        className="btn btn--sm btn--ghost"
                        onClick={() => handleReject(o.id)}
                        type="button"
                      >
                        Rechazar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}