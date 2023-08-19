import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("login")));
  const [isCertificate, setIsCertificate] = useState(JSON.parse(localStorage.getItem("certificate")));

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("login", true);
};

  const logout = () => {
    setIsLoggedIn(false);
    setIsCertificate(false);
    localStorage.setItem("login", false);
    localStorage.setItem("certificate", false);
  };

  const certificate = (certificate) => {
    setIsCertificate(certificate);
    localStorage.setItem("certificate", certificate)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isCertificate, login, certificate, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
