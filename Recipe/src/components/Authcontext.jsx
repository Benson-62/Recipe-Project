import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const savedAuthData = localStorage.getItem('authData');
    return savedAuthData ? JSON.parse(savedAuthData) : { token: null, isAdmin: false, userId: null };
  });

  useEffect(() => {
    localStorage.setItem('authData', JSON.stringify(authData));
  }, [authData]);

  const login = (newAuthData) => {
    setAuthData(newAuthData);
  };

  const logout = () => {
    setAuthData({ token: null, isAdmin: false, userId: null });
    localStorage.removeItem('authData');
  };

  const value = { authData, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
