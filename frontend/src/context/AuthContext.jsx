import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const mockUsers = {
  department: {
    name: "K. Molefe",
    role: "department",
  },
  supervisor: {
    name: "M. Dube",
    role: "supervisor",
  },
  division: {
    name: "Elena Volkov",
    role: "division",
  },
  strategy: {
    name: "Strategy Office",
    role: "strategy",
  },
  ceo: {
    name: "CEO",
    role: "ceo",
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(mockUsers.department);

  const switchRole = (role) => {
    setUser(mockUsers[role]);
  };

  return (
    <AuthContext.Provider value={{ user, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);