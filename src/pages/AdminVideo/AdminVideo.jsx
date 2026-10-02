import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getHomeVideo,
  adminUpdateHomeVideo,
  adminDeleteHomeVideo,
} from '../../api/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { resolveImageUrl } from '../../utils/imageUrl.js';
import './AdminVideo.css';

export default function AdminVideo() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [okMsg, setOkMsg] = useState(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    getHomeVideo()
      .then((d) => {
        setData(d);
        setTitle(d?.title || 'Conoce Comas TECH');
        setPreviewUrl(d?.video_url ? resolveImageUrl(d.video_url) : null);
      })
      .catch(() => setError('No se pudo cargar el video actual'))
      .finally(() => setLoading(false));
  }, [user, authLoading, navigate]);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setOkMsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setOkMsg(null);
    try {
      const fd = new FormData();
      fd.append('title', title);
      if (file) fd.append('video', file);

      const updated = await adminUpdateHomeVideo(fd);
      setData(updated);
      setPreviewUrl(resolveImageUrl(updated.video_url));
      setFile(null);
      setOkMsg('Video actualizado correctamente');
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Error al guardar'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('¿Seguro que quieres eliminar el video de la Home?')) return;
    setSaving(true);
    setError(null);
    setOkMsg(null);
    try {
      await adminDeleteHomeVideo();
      setData({ video_url: null, title });
      setPreviewUrl(null);
      setFile(null);
      setOkMsg('Video eliminado');
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Error al eliminar'
      );
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <section className="section">
        <div className="container">
          <p className="text-muted">Cargando video...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="admin__header">
          <h1 className="section__title">Video de la Home</h1>
          <button
            className="btn btn--sm btn--ghost"
            type="button"
            onClick={() => navigate('/admin')}
          >
            ← Volver al panel
          </button>
        </div>

        <form className="admin-video__form" onSubmit={handleSubmit}>
          {/* Preview */}
          <div className="admin-video__preview">
            <div className="admin-video__frame">
              {previewUrl ? (
                <video
                  src={previewUrl}
                  className="admin-video__video"
                  controls
                  preload="metadata"
                />
              ) : (
                <div className="admin-video__placeholder">
                  Sin video configurado
                </div>
              )}
            </div>

            <label className="btn btn--sm admin-video__upload">
              {file ? 'Cambiar archivo' : 'Seleccionar video'}
              <input
                type="file"
                accept="video/mp4,video/webm"
                onChange={handleFile}
                hidden
              />
            </label>
            <small className="text-muted">
              MP4 o WEBM · máx. 50MB · recomendado 1280×720
            </small>
          </div>

          {/* Campos */}
          <div className="admin-video__fields">
            <label>
              Título de la sección
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Conoce Comas TECH"
              />
            </label>

            {data?.video_url && (
              <div className="admin-video__current">
                <p className="text-muted">
                  Video actual:{' '}
                  <a
                    href={resolveImageUrl(data.video_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver en pestaña nueva
                  </a>
                </p>
              </div>
            )}

            {error && <p className="text-error">{error}</p>}
            {okMsg && <p className="text-success">{okMsg}</p>}

            <div className="admin-video__actions">
              <button className="btn" type="submit" disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>

              {data?.video_url && (
                <button
                  className="btn btn--ghost admin-video__danger"
                  type="button"
                  onClick={handleDelete}
                  disabled={saving}
                >
                  Eliminar video
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}