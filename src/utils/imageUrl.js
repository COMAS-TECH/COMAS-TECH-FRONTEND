const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:4000/api')
  .replace(/\/api\/?$/, '');

/**
 * Convierte un image_url relativo del backend en URL absoluta.
 * Si ya es absoluta (http/https) o es un data: URL, la devuelve tal cual.
 */
export function resolveImageUrl(url) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url) || url.startsWith('data:')) return url;
  if (url.startsWith('/')) return `${API_BASE}${url}`;
  return `${API_BASE}/${url}`;
}

export { API_BASE };