import axios from 'axios';

// ============================================
// CONFIGURACIÓN DE URL DEL BACKEND
// ============================================
// En producción (Vercel) usa Render.
// En desarrollo (localhost) usa localhost.
const isProduction = import.meta.env.PROD;

const DEFAULT_API_URL = isProduction
  ? 'https://comas-tech-backend.onrender.com/api'
  : 'http://localhost:4000/api';

const API_URL = import.meta.env.VITE_API_URL || DEFAULT_API_URL;

// Base del servidor SIN /api (para archivos de /uploads)
const API_BASE = API_URL.replace(/\/api\/?$/, '');

// ============================================
// CLIENTE AXIOS
// ============================================
const api = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60s para subir videos
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
  return api.post(`/orders/${orderId}/receipt`, fd).then((r) => r.data);
};

export const getMyOrders = () => api.get('/orders/me').then((r) => r.data);
export const getMyCourses = () =>
  api.get('/orders/me/courses').then((r) => r.data);

// ---------- ARCHIVOS PROTEGIDOS ----------
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
export const adminUpdateCourse = (id, formData) =>
  api.put(`/courses/${id}`, formData).then((r) => r.data);

// ---------- SETTINGS ----------
export const getHomeVideo = () =>
  api.get('/settings/home-video').then((r) => r.data);

export const adminUpdateHomeVideo = (formData) =>
  api.put('/settings/home-video', formData).then((r) => r.data);

export const adminDeleteHomeVideo = () =>
  api.delete('/settings/home-video').then((r) => r.data);

// ---------- CONTACTO ----------
export const sendContact = (payload) =>
  api.post('/contact', payload).then((r) => r.data);

export { API_BASE };
export default api;