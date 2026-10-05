import { API_BASE, DEFAULT_COURSE_IMAGE } from '../api/api.js';

export { DEFAULT_COURSE_IMAGE };

/**
 * Convierte un image_url relativo del backend en URL absoluta.
 * Si ya es absoluta (http/https) o es un data: URL, la devuelve tal cual.
 * Devuelve null si no hay URL (útil para avatares que sí pueden ser null).
 */
export function resolveImageUrl(url) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url) || url.startsWith('data:')) return url;
  if (url.startsWith('/')) return `${API_BASE}${url}`;
  return `${API_BASE}/${url}`;
}

/**
 * Igual que resolveImageUrl pero para portadas de cursos:
 * si no hay URL, devuelve la imagen por defecto (nunca null).
 */
export function resolveCourseImage(url) {
  return resolveImageUrl(url) || DEFAULT_COURSE_IMAGE;
}

export { API_BASE };