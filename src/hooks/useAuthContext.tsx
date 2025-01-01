import { useContext } from "react";
import { createContext } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

interface AuthActionsType {
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthActionsContext = createContext<AuthActionsType | undefined>(
  undefined,
);

export const useAuthActions = () => {
  const context = useContext(AuthActionsContext);
  if (context === undefined) {
    throw new Error("useAuthActions must be used within a AuthProvider");
  }
  return context;
};
