import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  timeout: 60000, // 60s para que aguante subir videos
});

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
  return api
    .post(`/orders/${orderId}/receipt`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((r) => r.data);
};
export const getMyOrders = () => api.get('/orders/me').then((r) => r.data);
export const getMyCourses = () =>
  api.get('/orders/me/courses').then((r) => r.data);

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
  api
    .put(`/courses/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((r) => r.data);

// ---------- SETTINGS (público) ----------
export const getHomeVideo = () =>
  api.get('/settings/home-video').then((r) => r.data);

// ---------- SETTINGS (admin) ----------
export const adminUpdateHomeVideo = (formData) =>
  api
    .put('/settings/home-video', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((r) => r.data);

export const adminDeleteHomeVideo = () =>
  api.delete('/settings/home-video').then((r) => r.data);

// ---------- CONTACTO ----------
export const sendContact = (payload) =>
  api.post('/contact', payload).then((r) => r.data);

export default api;