/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect } from "react";

type Role = "superadmin" | "admin" | "user";

interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  phone: string;
}

interface RoleContextType {
  currentUser: UserData | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  users: UserData[];
  addUser: (name: string, email: string, password: string, role: Role, phone: string) => void;
  changePassword: (userId: number, oldPass: string, newPass: string) => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load users from localStorage or set default super admin
  const [users, setUsers] = useState<UserData[]>(() => {
    const saved = localStorage.getItem("users");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Super Admin",
            email: "admin@mail.com",
            password: "Pass",
            role: "superadmin",
            phone: "9876543218",
          },
        ];
  });

  // Load current user from localStorage if available
  const [currentUser, setCurrentUser] = useState<UserData | null>(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  // Sync users with localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Sync currentUser with localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // Login
  const login = (email: string, password: string) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
  };

  // Add User
  const addUser = (name: string, email: string, password: string, role: Role, phone: string) => {
    setUsers((prev) => [...prev, { id: prev.length + 1, name, email, password, role, phone }]);
  };

  // Change Password
  const changePassword = (userId: number, oldPass: string, newPass: string) => {
    const updatedUsers = users.map((u) =>
      u.id === userId && u.password === oldPass ? { ...u, password: newPass } : u
    );
    const isChanged = JSON.stringify(users) !== JSON.stringify(updatedUsers);
    if (isChanged) {
      setUsers(updatedUsers);
      // also update currentUser if it's the same user
      if (currentUser && currentUser.id === userId) {
        setCurrentUser({ ...currentUser, password: newPass });
      }
    }
    return isChanged;
  };

  return (
    <RoleContext.Provider value={{ currentUser, login, logout, users, addUser, changePassword }}>
      {children}
    </RoleContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used inside RoleProvider");
  return ctx;
};
