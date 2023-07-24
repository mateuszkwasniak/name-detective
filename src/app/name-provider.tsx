"use client";

import { Context } from "react";
import { createContext, useState } from "react";

export const NameContext: Context<NameDataContext> = createContext({
  nameData: { nationalityData: null, genderData: null } as NameData,
  setNameData: (nameData: NameData) => {},
});

export const NameProvider = ({ children }: { children: React.ReactNode }) => {
  const [nameData, setNameData] = useState<NameData>(null);

  return (
    <NameContext.Provider value={{ nameData, setNameData }}>
      {children}
    </NameContext.Provider>
  );
};
