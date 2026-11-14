import { useEffect, useState } from 'react';
import { getHomeVideo, API_BASE } from '../../api/api.js';
import './HomeVideo.css';

function resolveVideoUrl(url) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url) || url.startsWith('data:')) return url;
  if (url.startsWith('/')) return `${API_BASE}${url}`;
  return `${API_BASE}/${url}`;
}

function extractYouTubeId(url) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

// Video por defecto si la API no devuelve uno
const FALLBACK_VIDEO = '/uploads/home-video/home-video-1791172816598-823605.mp4';

export default function HomeVideo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activo = true;
    getHomeVideo()
      .then((d) => {
        if (activo) setData(d);
      })
      .catch(() => {
        if (activo) setData(null);
      })
      .finally(() => {
        if (activo) setLoading(false);
      });
    return () => {
      activo = false;
    };
  }, []);

  if (loading) return null;

  const rawUrl = data?.video_url || FALLBACK_VIDEO;
  const src = resolveVideoUrl(rawUrl);
  const isYouTube = /youtube\.com|youtu\.be/.test(rawUrl);
  const youtubeId = isYouTube ? extractYouTubeId(rawUrl) : null;

  return (
    <section className="section home-video">
      <div className="container">
        <h2 className="section__title">
          {data?.title || 'Conoce Comas TECH'}
        </h2>
        <p className="section__subtitle">
          Formacion tecnologica para todas las edades.
        </p>

        <div className="home-video__frame">
          {youtubeId ? (
            <iframe
              className="home-video__iframe"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="Video de presentacion"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              className="home-video__video"
              src={src}
              controls
              playsInline
              preload="metadata"
            >
              Tu navegador no soporta video HTML5.
            </video>
          )}
        </div>
      </div>
    </section>
  );
}