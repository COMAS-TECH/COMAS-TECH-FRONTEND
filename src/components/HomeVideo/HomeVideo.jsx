import { useEffect, useState } from 'react';
import { getHomeVideo } from '../../api/api.js';
import { resolveImageUrl } from '../../utils/imageUrl.js';
import './HomeVideo.css';

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

  // Sin video configurado → no mostramos la sección
  if (loading || !data?.video_url) return null;

  const src = resolveImageUrl(data.video_url);

  // Detectar si es YouTube (por si en algún momento quieres soportarlo)
  const isYouTube = /youtube\.com|youtu\.be/.test(data.video_url);
  const youtubeId = isYouTube ? extractYouTubeId(data.video_url) : null;

  return (
    <section className="section home-video">
      <div className="container">
        <h2 className="section__title">
          {data.title || 'Conoce Comas TECH'}
        </h2>
        <p className="section__subtitle">
          Formación tecnológica para todas las edades.
        </p>

        <div className="home-video__frame">
          {youtubeId ? (
            <iframe
              className="home-video__iframe"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="Video de presentación"
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

function extractYouTubeId(url) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}