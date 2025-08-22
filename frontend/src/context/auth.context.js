import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authAPI from '../api/auth.api'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      authAPI.setAuthToken(token);
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      if (token) {
        const userData = {
          id: 1,
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        };
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    try {
      const res = await authAPI.register(formData);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      throw err.response?.data || { message: 'Registration failed' };
    }
  };

  const login = async (formData) => {
    try {
      const res = await authAPI.login(formData);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      throw err.response?.data || { message: 'Login failed' };
    }
  };

  const changePassword = async (formData) => {
    try {
      await authAPI.changePassword(formData);
      navigate('/');
    } catch (err) {
      throw err.response?.data || { message: 'Password change failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    authAPI.setAuthToken(null);
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