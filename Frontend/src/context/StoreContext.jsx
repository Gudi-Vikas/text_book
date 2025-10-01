import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken_] = useState(localStorage.getItem('token') || "");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const url = "http://localhost:4000";

  // Set the default authorization header and fetch user data on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken_(token);
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get('/api/user/me');
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        setToken_("");
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const setToken = (newToken) => {
    if (newToken) {
      setToken_(newToken);
      localStorage.setItem('token', newToken);
      setIsAuthenticated(true);
      // Fetch user data after setting the token
      fetchUserData();
    } else {
      setToken_("");
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    }
  };

  const logout = () => {
    setToken_("");
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  const contextValue = {
    url,
    token,
    setToken,
    user,
    isLoading,
    isAuthenticated,
    logout,
    refreshUser: fetchUserData,
    api // Export the configured axios instance
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {!isLoading && props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
