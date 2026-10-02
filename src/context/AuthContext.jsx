import { createContext, useContext, useEffect, useState } from 'react';
import { getMe, loginUser, registerUser } from '../api/api.js';

const AuthContext = createContext(null);

// Acepta { user: {...} } o { id, role, ... } directo
function normalizeUser(data) {
  if (!data) return null;
  return data.user ?? data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('comastech-token');
    if (!token) {
      setLoading(false);
      return;
    }
    getMe()
      .then((data) => setUser(normalizeUser(data)))
      .catch(() => {
        localStorage.removeItem('comastech-token');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    localStorage.setItem('comastech-token', data.token);
    const u = normalizeUser(data);
    setUser(u);
    return u;
  };

  const register = async (payload) => {
    const data = await registerUser(payload);
    localStorage.setItem('comastech-token', data.token);
    const u = normalizeUser(data);
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem('comastech-token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}