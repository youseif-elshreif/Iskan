"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api } from "@/services/api";

interface User {
  id: string;
  username: string;
  role: string;
  email: string;
  name: string;
}

interface UserWithPassword extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("iskan_admin_token");
    const userData = localStorage.getItem("iskan_user_data");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("iskan_admin_token");
        localStorage.removeItem("iskan_user_data");
      }
    }
    setLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      // Authenticate with JSON Server
      const response = await api.get("/users");
      const users: UserWithPassword[] = response.data;

      const authenticatedUser = users.find(
        (u: UserWithPassword) =>
          u.username === username && u.password === password
      );

      if (authenticatedUser) {
        // Remove password from user data before storing
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = authenticatedUser;

        localStorage.setItem("iskan_admin_token", "authenticated");
        localStorage.setItem(
          "iskan_user_data",
          JSON.stringify(userWithoutPassword)
        );
        setUser(userWithoutPassword);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("iskan_admin_token");
    localStorage.removeItem("iskan_user_data");
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
