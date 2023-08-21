import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(window.sessionStorage.getItem("login")));
  const [isCertificate, setIsCertificate] = useState(JSON.parse(window.sessionStorage.getItem("certificate")));

  const login = () => {
    setIsLoggedIn(true);
    window.sessionStorage.setItem("login", true);
};

  const logout = () => {
    setIsLoggedIn(false);
    setIsCertificate(false);
    window.sessionStorage.setItem("login", false);
    window.sessionStorage.setItem("certificate", false);
  };

  const certificate = (certificate) => {
    setIsCertificate(certificate);
    window.sessionStorage.setItem("certificate", certificate)
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
