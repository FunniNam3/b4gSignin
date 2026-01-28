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

  const login = (user: User) => {
    setUser(user); // Adds user info to state
  };

  const logout = () => {
    setUser(null); // Removes user info from state
    axios.post("/logout"); // send request to api to logout the user from backend
    delete axios.defaults.headers.common["Authorization"];
  };

  // On page open and reloadsd check if a user is currently signed in or not
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await axios.get("/currentUser");
        if (res.data.id) {
          setUser(res.data);
        } else {
          throw new Error("No user in session");
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

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
