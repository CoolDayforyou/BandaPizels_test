import { AuthContextType } from "@/types/Types";
import { getToken, removeToken, setToken } from "@/utils/storage";
import { createContext, FC, ReactNode, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      setIsLogged(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (token: string) => {
    await setToken(token);
    setIsLogged(true);
  };

  const logout = async () => {
    await removeToken();
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
