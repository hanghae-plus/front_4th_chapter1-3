import { createContext } from "react";
import { Theme } from "../../interface/theme";

export const ThemeContext = createContext<Theme | undefined>(undefined);
