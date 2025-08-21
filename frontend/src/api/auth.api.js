import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete api.defaults.headers.common['x-auth-token'];
  }
};

// Auth API calls
export const register = (userData) => api.post('/api/auth/register', userData);
export const login = (userData) => api.post('/api/auth/login', userData);
export const changePassword = (passwordData) => api.post('/api/auth/change-password', passwordData);
export const getUser = () => api.get('/api/auth/user');

export default api;