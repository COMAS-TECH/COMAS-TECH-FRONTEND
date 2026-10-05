import axios from 'axios';

// Base del servidor SIN /api (para archivos de /uploads)
const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:4000/api').replace(
  /\/api\/?$/,
  ''
);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  timeout: 60000, // 60s para que aguante subir videos
});

// Imagen por defecto para portadas de cursos
export const DEFAULT_COURSE_IMAGE = `${API_BASE}/uploads/courses/imagen_defecto.jpg`;

// Inyecta el token en cada request si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('comastech-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------- AUTH ----------
export const registerUser = (payload) =>
  api.post('/auth/register', payload).then((r) => r.data);
export const loginUser = (payload) =>
  api.post('/auth/login', payload).then((r) => r.data);
export const getMe = () => api.get('/auth/me').then((r) => r.data);

// ---------- CURSOS ----------
export const getCourses = () => api.get('/courses').then((r) => r.data);
export const getCourseById = (id) =>
  api.get(`/courses/${id}`).then((r) => r.data);

// ---------- ORDENES ----------
export const createOrder = (payload) =>
  api.post('/orders', payload).then((r) => r.data);

export const uploadReceipt = (orderId, file) => {
  const fd = new FormData();
  fd.append('receipt', file);
  // ⚠️ NO poner Content-Type: multipart/form-data.
  // Axios lo agrega solo, con el boundary correcto.
  return api.post(`/orders/${orderId}/receipt`, fd).then((r) => r.data);
};

export const getMyOrders = () => api.get('/orders/me').then((r) => r.data);
export const getMyCourses = () =>
  api.get('/orders/me/courses').then((r) => r.data);

// ---------- ARCHIVOS PROTEGIDOS (comprobantes con token) ----------
// Descarga el comprobante con la sesion del usuario (el backend lo exige)
// y devuelve una URL temporal para mostrarlo.
export const getReceiptFile = (receiptUrl) => {
  const token = localStorage.getItem('comastech-token');
  return axios
    .get(`${API_BASE}${receiptUrl}`, {
      responseType: 'blob',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    .then((r) => ({
      url: URL.createObjectURL(r.data),
      type: r.data.type || '',
    }));
};

// ---------- ADMIN: ÓRDENES ----------
export const adminStats = () => api.get('/admin/stats').then((r) => r.data);
export const adminListOrders = (status) =>
  api
    .get('/admin/orders', { params: status ? { status } : {} })
    .then((r) => r.data);
export const adminUpdateOrder = (id, payload) =>
  api.patch(`/admin/orders/${id}`, payload).then((r) => r.data);

// ---------- ADMIN: CURSOS ----------
export const adminUpdateCourse = (id, formData) => {
  // ⚠️ NO poner Content-Type: multipart/form-data.
  return api.put(`/courses/${id}`, formData).then((r) => r.data);
};

// ---------- SETTINGS (público) ----------
export const getHomeVideo = () =>
  api.get('/settings/home-video').then((r) => r.data);

// ---------- SETTINGS (admin) ----------
export const adminUpdateHomeVideo = (formData) => {
  // ⚠️ NO poner Content-Type: multipart/form-data.
  return api.put('/settings/home-video', formData).then((r) => r.data);
};

export const adminDeleteHomeVideo = () =>
  api.delete('/settings/home-video').then((r) => r.data);

// ---------- CONTACTO ----------
export const sendContact = (payload) =>
  api.post('/contact', payload).then((r) => r.data);

export { API_BASE };
export default api;