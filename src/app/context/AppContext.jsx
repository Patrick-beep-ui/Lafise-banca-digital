"use client";

import { createContext, useState, useContext, useEffect } from 'react';
import { getUsers } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (userId) => {
    try {
      const res = await getUsers(userId);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: "User not found" };
    }
  };

  return (
    <AppContext.Provider value={{ user, login }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
