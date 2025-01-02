import { createContext } from "react";
import { LoginContextType } from "../../interface/user";

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined,
);
