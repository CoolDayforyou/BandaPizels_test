import { DarkTheme } from "@/constants/DarkTheme";
import { createContext, FC, ReactNode, useContext } from "react";

export const ThemeContext = createContext(DarkTheme);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={DarkTheme}>{children}</ThemeContext.Provider>
  );
};
