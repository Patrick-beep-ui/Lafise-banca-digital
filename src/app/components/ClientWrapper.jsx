"use client";

import { AppProvider } from "../context/AppContext"; 

export const ClientWrapper = ({ children }) => {
  return <AppProvider>{children}</AppProvider>;
};
