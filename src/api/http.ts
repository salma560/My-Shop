import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:5006';

const http = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});


http.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;
