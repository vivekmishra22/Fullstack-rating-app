import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

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

// Add these new API calls
export const getStores = () => api.get('/api/stores');
export const getUsers = () => api.get('/api/users');
export const getDashboardStats = () => api.get('/api/dashboard/admin');
export const submitRating = (ratingData) => api.post('/api/ratings', ratingData);
export const getUserRatings = () => api.get('/api/ratings/user');

export default api;