import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const savedAuthData = localStorage.getItem('authData');
    return savedAuthData ? JSON.parse(savedAuthData) : { token: null, isAdmin: false, userId: null };
  });

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

