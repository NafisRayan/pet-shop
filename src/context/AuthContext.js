import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../services/firebase';
import axios from '../services/axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Configure axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  }, [token]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setLoading(false);
    });

    // Check JWT token
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }

    return unsubscribe;
  }, [token]);

  // Load User from JWT token
  const loadUser = async () => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token; // Set the token in the headers
    }

    try {
      const res = await axios.get('/api/auth');
      setCurrentUser(res.data);
      setIsAuthenticated(true);
      setIsAdmin(res.data.isAdmin);
    } catch (err) {
      console.error('Error loading user:', err.response ? err.response.data : err.message);
      localStorage.removeItem('token');
      setToken(null);
      setCurrentUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
    setLoading(false);
  };

  // Register User
  const register = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      await loadUser();
      return true;
    } catch (err) {
      throw err.response?.data?.msg || 'Registration failed';
    }
  };

  // Login User
  const login = async (formData) => {
    try {
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      await loadUser();
      return true;
    } catch (err) {
      throw err.response?.data?.msg || 'Login failed';
    }
  };

  // Logout
  const logout = () => {
    auth.signOut();
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    delete axios.defaults.headers.common['x-auth-token'];
  };

  const value = {
    currentUser,
    loading,
    isAuthenticated,
    isAdmin,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}