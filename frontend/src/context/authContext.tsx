import React, { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { User } from "../types/user";
import type { AuthContextType } from "../types/authContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage on app load to see if a session exists
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      // In a real app, you'd want to validate the token with your backend here
      // For this example, we assume the token and user data are valid if present
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string, userData: User) => {
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
