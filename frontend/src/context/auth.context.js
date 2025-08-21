import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/auth.api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      api.setAuthToken(token);
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      // For now, we'll simulate a user load
      // In a real app, you'd make an API call to get user data
      const userData = {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      };
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    try {
      // Simulate registration
      const res = { data: { token: 'mock-token', user: formData } };
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      await loadUser();
      navigate('/');
    } catch (err) {
      throw err;
    }
  };

  const login = async (formData) => {
    try {
      // Simulate login - accept any credentials for now
      const res = { 
        data: { 
          token: 'mock-token', 
          user: {
            id: 1,
            name: formData.email === 'admin@example.com' ? 'Admin User' : 'Test User',
            email: formData.email,
            role: formData.email === 'admin@example.com' ? 'admin' : 'user'
          }
        } 
      };
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      await loadUser();
      navigate('/');
    } catch (err) {
      throw err;
    }
  };

  const changePassword = async (formData) => {
    try {
      // Simulate password change
      navigate('/');
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        register,
        login,
        changePassword,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;