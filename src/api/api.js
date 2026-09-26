import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
});

export const getCourses = () => api.get('/courses').then((r) => r.data);
export const getCourseById = (id) => api.get(`/courses/${id}`).then((r) => r.data);
export const createOrder = (payload) => api.post('/orders', payload).then((r) => r.data);
export const sendContact = (payload) => api.post('/contact', payload).then((r) => r.data);

export default api;
