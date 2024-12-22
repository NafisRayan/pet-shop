import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../services/firebase';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Check JWT token
    if (token) {
      loadUser();
    }

    return unsubscribe;
  }, [token]);

  // Load User from JWT token
  const loadUser = async () => {
    if (token) {
      try {
        const res = await axios.get('/api/auth', {
          headers: {
            'x-auth-token': token
          }
        });
        setCurrentUser(res.data);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
      }
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
      throw err.response.data.msg;
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
      throw err.response.data.msg;
    }
  };

  // Logout
  const logout = () => {
    auth.signOut();
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    currentUser,
    loading,
    isAuthenticated,
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