import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, adminUpdateCourse } from '../../api/api.js';
import { resolveImageUrl } from '../../utils/imageUrl.js';
import './AdminCursoEdit.css';

export default function AdminCursoEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [okMsg, setOkMsg] = useState(null);

  useEffect(() => {
    getCourseById(id)
      .then((data) => {
        setCurso(data);
        setPreview(resolveImageUrl(data.image_url));
      })
      .catch(() => setError('No se pudo cargar el curso'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurso((c) => ({
      ...c,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCurso((c) => ({ ...c, _file: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setOkMsg(null);
    try {
      const fd = new FormData();
      fd.append('title', curso.title);
      fd.append('description', curso.description || '');
      fd.append('category', curso.category || '');
      fd.append('duration_weeks', curso.duration_weeks ?? '');
      fd.append('modality', curso.modality || '');
      fd.append('price', curso.price);
      fd.append('has_certification', curso.has_certification ? '1' : '0');
      fd.append('active', curso.active ? '1' : '0');
      if (curso._file) fd.append('image', curso._file);

      const updated = await adminUpdateCourse(id, fd);
      setCurso({ ...updated, _file: undefined });
      setPreview(resolveImageUrl(updated.image_url));
      setOkMsg('Curso actualizado correctamente');
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Error al guardar'
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <p className="text-muted">Cargando curso...</p>
        </div>
      </section>
    );
  }

  if (!curso) {
    return (
      <section className="section">
        <div className="container">
          <p className="text-error">{error || 'Curso no encontrado'}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="section__title">Editar curso #{curso.id}</h1>

        <form className="admin-curso__form" onSubmit={handleSubmit}>
          {/* Columna izquierda: preview imagen */}
          <div className="admin-curso__preview">
            <div className="admin-curso__frame">
              {preview ? (
                <img src={preview} alt="Portada" className="admin-curso__img" />
              ) : (
                <div className="admin-curso__placeholder">Sin portada</div>
              )}
            </div>

            <label className="btn btn--sm admin-curso__upload">
              {curso._file ? 'Cambiar archivo' : 'Subir nueva portada'}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFile}
                hidden
              />
            </label>
            <small className="text-muted">JPG, PNG o WEBP · máx. 5MB</small>
          </div>

          {/* Columna derecha: campos */}
          <div className="admin-curso__fields">
            <label>
              Título
              <input name="title" value={curso.title} onChange={handleChange} />
            </label>

            <label>
              Descripción
              <textarea
                name="description"
                value={curso.description || ''}
                onChange={handleChange}
                rows={4}
              />
            </label>

            <label>
              Categoría
              <input
                name="category"
                value={curso.category || ''}
                onChange={handleChange}
              />
            </label>

            <div className="admin-curso__row">
              <label>
                Duración (semanas)
                <input
                  type="number"
                  name="duration_weeks"
                  value={curso.duration_weeks ?? ''}
                  onChange={handleChange}
                />
              </label>

              <label>
                Modalidad
                <input
                  name="modality"
                  value={curso.modality || ''}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label>
              Precio (S/)
              <input
                type="number"
                step="0.01"
                name="price"
                value={curso.price}
                onChange={handleChange}
              />
            </label>

            <label className="admin-curso__check">
              <input
                type="checkbox"
                name="has_certification"
                checked={!!curso.has_certification}
                onChange={handleChange}
              />
              Tiene certificación
            </label>

            <label className="admin-curso__check">
              <input
                type="checkbox"
                name="active"
                checked={!!curso.active}
                onChange={handleChange}
              />
              Activo
            </label>

            {error && <p className="text-error">{error}</p>}
            {okMsg && <p className="text-success">{okMsg}</p>}

            <div className="admin-curso__actions">
              <button className="btn" type="submit" disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
              <button
                className="btn btn--ghost"
                type="button"
                onClick={() => navigate('/admin')}
              >
                Volver
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}