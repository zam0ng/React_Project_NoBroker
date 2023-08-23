import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(window.sessionStorage.getItem("login")));
  const [isCertificate, setIsCertificate] = useState(JSON.parse(window.sessionStorage.getItem("certificate")));
  const [isAdmin, setIsAdmin] = useState(JSON.parse(window.sessionStorage.getItem("admin")));

  const login = () => {
    setIsLoggedIn(true);
    window.sessionStorage.setItem("login", true);
};

  const logout = () => {
    setIsLoggedIn(false);
    setIsCertificate(false);
    setIsAdmin(false);
    window.sessionStorage.setItem("login", false);
    window.sessionStorage.setItem("certificate", false);
    window.sessionStorage.setItem("admin", false);
  };

  const certificate = (certificate) => {
    setIsCertificate(certificate);
    window.sessionStorage.setItem("certificate", certificate)
  }

  const admin = (admin) => {
    setIsAdmin(admin);
    window.sessionStorage.setItem("admin", admin)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isCertificate, isAdmin, login, certificate, logout, admin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
