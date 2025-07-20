import axios from 'axios';

// Automatically use env-based base URL
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
});

// Attach token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
