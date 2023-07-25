"use client";

import { Context } from "react";
import { createContext, useState } from "react";

export const AuthContext: Context<AuthContext> = createContext({
  auth: { name: "" },
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth>({
    name: "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
