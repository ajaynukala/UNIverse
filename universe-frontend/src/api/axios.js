import axios from 'axios';
import useStore from '../store/useStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

let activeRequests = 0;

api.interceptors.request.use(
  (config) => {
    activeRequests++;
    useStore.getState().setGlobalLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    activeRequests = Math.max(0, activeRequests - 1);
    if (activeRequests === 0) useStore.getState().setGlobalLoading(false);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    activeRequests = Math.max(0, activeRequests - 1);
    if (activeRequests === 0) useStore.getState().setGlobalLoading(false);
    return response;
  },
  (error) => {
    activeRequests = Math.max(0, activeRequests - 1);
    if (activeRequests === 0) useStore.getState().setGlobalLoading(false);
    return Promise.reject(error);
  }
);

export default api;
