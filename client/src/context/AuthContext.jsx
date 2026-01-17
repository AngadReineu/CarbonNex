import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API = "http://localhost:3000/api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);


  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get(`${API}/me`);
        setUser(res.data); 
      } catch (error) {
        console.error("Failed to restore session:", error.message);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [token]);


  const login = async (email, password) => {
    const res = await axios.post(`${API}/login`, { email, password });
    const { user, token } = res.data;

    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  };


  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
